import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
import { FindUserByEmailUseCase } from './find-user-by-email.use-case';

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

    expect(result).toEqual(user);
  });
});