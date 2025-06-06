import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
import { FindUserByEmailUseCase } from './find-user-by-email.use-case';
import { UserStatus } from '@prisma/client';

describe('FindByEmailUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: FindUserByEmailUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new FindUserByEmailUseCase(repo);
  });

  it('should find a user by Email', async () => {
    const user = await makeUser();
    await repo.create(user);

    const result = await useCase.execute(user.email);

    expect(result).toBeDefined();
    expect(result?.email).toBe(user.email);
    expect(result?.name).toBe(user.name);
    expect(result?.status).toBe(user.status);
    expect(result?.role).toBe(user.role);
  });

  it('should return null when user not found', async () => {
    const result = await useCase.execute('non-existent@email.com');
    expect(result).toBeNull();
  });

  it('should find inactive user', async () => {
    const user = await makeUser({ status: 'INACTIVE' as UserStatus });
    await repo.create(user);

    const result = await useCase.execute(user.email);

    expect(result).toBeDefined();
    expect(result?.status).toBe('INACTIVE');
  });

  it('should find deleted user', async () => {
    const user = await makeUser();
    user.delete();
    await repo.create(user);

    const result = await useCase.execute(user.email);

    expect(result).toBeDefined();
    expect(result?.deletedAt).toBeInstanceOf(Date);
  });

  it('should find user with all fields', async () => {
    const user = await makeUser({
      name: 'John Doe',
      email: 'john@example.com',
      status: 'ACTIVE' as UserStatus,
    });
    await repo.create(user);

    const result = await useCase.execute(user.email);

    expect(result).toBeDefined();
    expect(result?.name).toBe('John Doe');
    expect(result?.email).toBe('john@example.com');
    expect(result?.status).toBe('ACTIVE');
    expect(result?.createdAt).toBeInstanceOf(Date);
    expect(result?.updatedAt).toBeInstanceOf(Date);
  });

  it('should be case insensitive for email', async () => {
    const user = await makeUser({ email: 'John.Doe@Example.com' });
    await repo.create(user);

    const result = await useCase.execute('john.doe@example.com');

    expect(result).toBeDefined();
    expect(result?.email).toBe('John.Doe@Example.com');
  });
});