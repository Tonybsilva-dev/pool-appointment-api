import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteUserUseCase } from './delete-user.use-case';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { UserStatus } from '@prisma/client';

describe('DeleteUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new DeleteUserUseCase(repo);
  });

  it('should delete a user', async () => {
    const user = await makeUser();
    await repo.create(user);

    await useCase.execute(user.id.toString());

    const deletedUser = await repo.findById(user.id.toString());
    expect(deletedUser).toBeDefined();
    expect(deletedUser?.status).toBe('INACTIVE');
    expect(deletedUser?.deletedAt).toBeInstanceOf(Date);
    expect(deletedUser?.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw error when user not found', async () => {
    await expect(() =>
      useCase.execute('non-existent-id')
    ).rejects.toThrow('User not found');
  });

  it('should maintain user data after deletion', async () => {
    const user = await makeUser({
      name: 'John Doe',
      email: 'john@example.com',
      status: 'ACTIVE' as UserStatus,
    });
    await repo.create(user);

    await useCase.execute(user.id.toString());

    const deletedUser = await repo.findById(user.id.toString());
    expect(deletedUser?.name).toBe('John Doe');
    expect(deletedUser?.email).toBe('john@example.com');
    expect(deletedUser?.status).toBe('INACTIVE');
    expect(deletedUser?.deletedAt).toBeInstanceOf(Date);
  });

  it('should not allow deleting an already deleted user', async () => {
    const user = await makeUser();
    await repo.create(user);

    // Primeira deleção
    await useCase.execute(user.id.toString());
    const firstDeletedUser = await repo.findById(user.id.toString());
    const firstDeletedAt = firstDeletedUser?.deletedAt;

    // Segunda deleção
    await useCase.execute(user.id.toString());
    const secondDeletedUser = await repo.findById(user.id.toString());

    expect(secondDeletedUser?.deletedAt).toEqual(firstDeletedAt);
    expect(secondDeletedUser?.status).toBe('INACTIVE');
  });
});