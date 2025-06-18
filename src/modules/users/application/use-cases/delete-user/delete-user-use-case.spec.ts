import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteUserUseCase } from './delete-user.use-case';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
import { UserStatus } from '@prisma/client';

describe('DeleteUserUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(userRepository);
  });

  it('should delete a user', async () => {
    const user = await makeUser();
    await userRepository.create(user);

    await deleteUserUseCase.execute(user.id.toString());

    const deletedUser = await userRepository.findById(user.id.toString());
    expect(deletedUser).toBeDefined();
    expect(deletedUser?.status).toBe(UserStatus.INACTIVE);
    expect(deletedUser?.deletedAt).toBeInstanceOf(Date);

    const total = await userRepository.count();
    expect(total).toBe(0);
  });

  it('should throw error when user not found', async () => {
    await expect(() =>
      deleteUserUseCase.execute('non-existent-id'),
    ).rejects.toThrow('User not found');
  });

  it('should delete user with different statuses', async () => {
    const activeUser = await makeUser({ status: UserStatus.ACTIVE });
    const inactiveUser = await makeUser({ status: UserStatus.INACTIVE });

    await userRepository.create(activeUser);
    await userRepository.create(inactiveUser);

    await deleteUserUseCase.execute(activeUser.id.toString());
    await deleteUserUseCase.execute(inactiveUser.id.toString());

    const total = await userRepository.count();
    expect(total).toBe(0);
  });

  it('should delete multiple users', async () => {
    const user1 = await makeUser();
    const user2 = await makeUser();
    const user3 = await makeUser();

    await userRepository.create(user1);
    await userRepository.create(user2);
    await userRepository.create(user3);

    expect(await userRepository.count()).toBe(3);

    await deleteUserUseCase.execute(user1.id.toString());
    await deleteUserUseCase.execute(user2.id.toString());

    expect(await userRepository.count()).toBe(1);
  });

  it('should handle multiple deletions of the same user', async () => {
    const user = await makeUser();
    await userRepository.create(user);

    await deleteUserUseCase.execute(user.id.toString());

    const deletedUser = await userRepository.findById(user.id.toString());
    expect(deletedUser?.status).toBe(UserStatus.INACTIVE);
    expect(deletedUser?.deletedAt).toBeInstanceOf(Date);

    await deleteUserUseCase.execute(user.id.toString());

    const deletedUser2 = await userRepository.findById(user.id.toString());
    expect(deletedUser2?.status).toBe(UserStatus.INACTIVE);
    expect(deletedUser2?.deletedAt).toBeInstanceOf(Date);
  });
});