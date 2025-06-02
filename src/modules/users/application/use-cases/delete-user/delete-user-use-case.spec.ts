import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { DeleteUserUseCase } from './delete-user.use-case';
import { makeUser } from 'test/factories/make-user';

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
    expect(deletedUser).toBeNull();
  });
});