import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
import { FindAllUsersUseCase } from './find-all-users.use-case';

describe('FindAllUsersUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: FindAllUsersUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new FindAllUsersUseCase(repo);
  });

  it('should return paginated users with total', async () => {
    await repo.create(await makeUser());
    await repo.create(await makeUser());

    const result = await useCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(2);
    expect(result.users).toHaveLength(2);
  });
});