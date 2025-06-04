import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { UpdateUserUseCase } from './update-user.use-case';
import { makeUser } from 'test/factories/make-user';
import { UserStatus, UserRole } from '@prisma/client';

describe('UpdateUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: UpdateUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new UpdateUserUseCase(repo);
  });

  it('should update a user name', async () => {
    const user = await makeUser();
    await repo.create(user);

    await useCase.execute({ id: user.id.toString(), name: 'Updated Name' });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.name).toBe('Updated Name');
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
  });

  it('should update a user email', async () => {
    const user = await makeUser();
    await repo.create(user);

    await useCase.execute({ id: user.id.toString(), email: 'updated@email.com' });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.email).toBe('updated@email.com');
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
  });

  it('should update a user status', async () => {
    const user = await makeUser();
    await repo.create(user);

    await useCase.execute({ id: user.id.toString(), status: 'INACTIVE' as UserStatus });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.status).toBe('INACTIVE');
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
  });

  it('should update a user role', async () => {
    const user = await makeUser();
    await repo.create(user);

    await useCase.execute({ id: user.id.toString(), role: 'ADMIN' as UserRole });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.role).toBe('ADMIN');
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
  });

  it('should clear deletedAt when status changes from INACTIVE to ACTIVE', async () => {
    const user = await makeUser({ status: 'INACTIVE' as UserStatus });
    user.delete(); // Adiciona deletedAt
    await repo.create(user);

    await useCase.execute({ id: user.id.toString(), status: 'ACTIVE' as UserStatus });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.status).toBe('ACTIVE');
    expect(updatedUser?.deletedAt).toBeUndefined();
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw error when user not found', async () => {
    await expect(() =>
      useCase.execute({ id: 'non-existent-id', name: 'Updated' })
    ).rejects.toThrow('User not found');
  });

  it('should update multiple fields at once', async () => {
    const user = await makeUser();
    await repo.create(user);

    await useCase.execute({
      id: user.id.toString(),
      name: 'Updated Name',
      email: 'updated@email.com',
      status: 'INACTIVE' as UserStatus,
      role: 'ADMIN' as UserRole,
    });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.name).toBe('Updated Name');
    expect(updatedUser?.email).toBe('updated@email.com');
    expect(updatedUser?.status).toBe('INACTIVE');
    expect(updatedUser?.role).toBe('ADMIN');
    expect(updatedUser?.updatedAt).toBeInstanceOf(Date);
  });
});