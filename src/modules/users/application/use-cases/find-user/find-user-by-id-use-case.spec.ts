import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { makeUser } from 'test/factories/make-user';

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

    expect(result).toEqual(user);
  });
});