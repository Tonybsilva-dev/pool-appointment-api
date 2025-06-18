import { describe, it, expect, beforeEach } from 'vitest';
import { FindAllUsersUseCase } from './find-all-users.use-case';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
import { UserStatus } from '@prisma/client';

describe('FindAllUsersUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findAllUsersUseCase: FindAllUsersUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
  });

  it('should return paginated users with total', async () => {
    await userRepository.create(await makeUser());
    await userRepository.create(await makeUser());
    await userRepository.create(await makeUser());

    const result = await findAllUsersUseCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(3);
    expect(result.users).toHaveLength(3);
  });

  it('should return empty list when no users exist', async () => {
    const result = await findAllUsersUseCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(0);
    expect(result.users).toHaveLength(0);
  });

  it('should return correct page of users', async () => {
    for (let i = 0; i < 5; i++) {
      await userRepository.create(await makeUser());
    }

    const result = await findAllUsersUseCase.execute({ page: 2, perPage: 2 });

    expect(result.total).toBe(5);
    expect(result.users).toHaveLength(2);
  });

  it('should return only active users', async () => {
    await userRepository.create(await makeUser({ status: UserStatus.ACTIVE }));
    await userRepository.create(await makeUser({ status: UserStatus.ACTIVE }));
    await userRepository.create(await makeUser({ status: UserStatus.INACTIVE }));

    const result = await findAllUsersUseCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(2);
    expect(result.users).toHaveLength(2);
    expect(result.users[0].status).toBe(UserStatus.ACTIVE);
    expect(result.users[1].status).toBe(UserStatus.ACTIVE);
  });

  it('should not return deleted users', async () => {
    const activeUser = await makeUser({ status: UserStatus.ACTIVE });
    await userRepository.create(activeUser);

    const inactiveUser = await makeUser({ status: UserStatus.INACTIVE });
    inactiveUser.delete();
    await userRepository.create(inactiveUser);

    const result = await findAllUsersUseCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(1);
    expect(result.users[0].status).toBe(UserStatus.ACTIVE);
  });

  it('should return last page correctly', async () => {
    for (let i = 0; i < 5; i++) {
      await userRepository.create(await makeUser());
    }

    const result = await findAllUsersUseCase.execute({ page: 3, perPage: 2 });

    expect(result.total).toBe(5);
    expect(result.users).toHaveLength(1);
  });

  it('should handle pagination with default values', async () => {
    await userRepository.create(await makeUser());
    await userRepository.create(await makeUser());

    const result = await findAllUsersUseCase.execute({});

    expect(result.total).toBe(2);
    expect(result.users).toHaveLength(2);
  });
});