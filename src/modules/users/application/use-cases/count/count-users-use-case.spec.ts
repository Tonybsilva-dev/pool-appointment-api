import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { CountUsersUseCase } from './count-user.use-case';
import { makeUser } from 'test/factories/make-user';
import { UserStatus } from '@prisma/client';

describe('CountUsersUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: CountUsersUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new CountUsersUseCase(repo);
  });

  it('should count active users', async () => {
    await repo.create(await makeUser());
    await repo.create(await makeUser());

    const count = await useCase.execute();
    expect(count).toBe(2);
  });

  it('should return zero when no users exist', async () => {
    const count = await useCase.execute();
    expect(count).toBe(0);
  });

  it('should not count inactive users', async () => {
    await repo.create(await makeUser({ status: 'ACTIVE' as UserStatus }));
    await repo.create(await makeUser({ status: 'INACTIVE' as UserStatus }));

    const count = await useCase.execute();
    expect(count).toBe(1);
  });

  it('should not count deleted users', async () => {
    const activeUser = await makeUser({ status: 'ACTIVE' as UserStatus });
    const inactiveUser = await makeUser({ status: 'INACTIVE' as UserStatus });

    activeUser.delete();
    inactiveUser.delete();

    await repo.create(activeUser);
    await repo.create(inactiveUser);

    const count = await useCase.execute();
    expect(count).toBe(0);
  });

  it('should count users with different roles', async () => {
    await repo.create(await makeUser({ role: 'USER' }));
    await repo.create(await makeUser({ role: 'ADMIN' }));

    const count = await useCase.execute();
    expect(count).toBe(2);
  });
});