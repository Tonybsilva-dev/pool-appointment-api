import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { UpdateUserUseCase } from './update-user.use-case';
import { makeUser } from 'test/factories/make-user';

describe('UpdateUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: UpdateUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new UpdateUserUseCase(repo);
  });

  it('should update a user', async () => {
    const user = await makeUser();
    await repo.create(user);

    user.updateName('Updated');
    await useCase.execute({ id: user.id.toString(), name: 'Updated' });

    const updatedUser = await repo.findById(user.id.toString());
    expect(updatedUser?.name).toBe('Updated');
  });
});