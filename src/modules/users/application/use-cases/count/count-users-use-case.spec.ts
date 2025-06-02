import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { CountUsersUseCase } from './count-user.use-case';
import { makeUser } from 'test/factories/make-user';

describe('CountUsersUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: CountUsersUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new CountUsersUseCase(repo);
  });

  it('should count users', async () => {
    await repo.create(await makeUser());
    await repo.create(await makeUser());

    const count = await useCase.execute();
    expect(count).toBe(2);
  });
});