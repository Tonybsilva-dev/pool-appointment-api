import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { makeUser } from 'test/factories/make-user';
import { UserStatus } from '@prisma/client';

describe('FindByIdUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: FindUserByIdUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new FindUserByIdUseCase(repo);
  });

  it('should find a user by ID', async () => {
    const user = await makeUser();
    await repo.create(user);

    const result = await useCase.execute(user.id.toString());

    expect(result).toBeDefined();
    expect(result?.id.toString()).toBe(user.id.toString());
    expect(result?.name).toBe(user.name);
    expect(result?.email).toBe(user.email);
    expect(result?.status).toBe(user.status);
    expect(result?.role).toBe(user.role);
  });

  it('should return null when user not found', async () => {
    const result = await useCase.execute('non-existent-id');
    expect(result).toBeNull();
  });

  it('should find inactive user', async () => {
    const user = await makeUser({ status: 'INACTIVE' as UserStatus });
    await repo.create(user);

    const result = await useCase.execute(user.id.toString());

    expect(result).toBeDefined();
    expect(result?.status).toBe('INACTIVE');
  });

  it('should find deleted user', async () => {
    const user = await makeUser();
    user.delete();
    await repo.create(user);

    const result = await useCase.execute(user.id.toString());

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

    const result = await useCase.execute(user.id.toString());

    expect(result).toBeDefined();
    expect(result?.name).toBe('John Doe');
    expect(result?.email).toBe('john@example.com');
    expect(result?.status).toBe('ACTIVE');
    expect(result?.createdAt).toBeInstanceOf(Date);
    expect(result?.updatedAt).toBeInstanceOf(Date);
  });
});