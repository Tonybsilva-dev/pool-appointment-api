import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
import { FindAllUsersUseCase } from './find-all-users.use-case';
import { UserStatus } from '@prisma/client';

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

  it('should return empty list when no users exist', async () => {
    const result = await useCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(0);
    expect(result.users).toHaveLength(0);
  });

  it('should return correct page of users', async () => {
    // Criar 5 usuários
    for (let i = 0; i < 5; i++) {
      await repo.create(await makeUser());
    }

    const result = await useCase.execute({ page: 2, perPage: 2 });

    expect(result.total).toBe(5);
    expect(result.users).toHaveLength(2);
  });

  it('should return active users even with deletedAt', async () => {
    const activeUser = await makeUser({ status: 'ACTIVE' as UserStatus });
    activeUser.delete(); // Adiciona deletedAt mas mantém status ACTIVE
    await repo.create(activeUser);

    const inactiveUser = await makeUser({ status: 'INACTIVE' as UserStatus });
    inactiveUser.delete();
    await repo.create(inactiveUser);

    const result = await useCase.execute({ page: 1, perPage: 10 });

    expect(result.total).toBe(1); // Apenas o usuário ativo deve aparecer
    expect(result.users[0].status).toBe('ACTIVE');
  });

  it('should return last page correctly', async () => {
    // Criar 5 usuários
    for (let i = 0; i < 5; i++) {
      await repo.create(await makeUser());
    }

    const result = await useCase.execute({ page: 3, perPage: 2 });

    expect(result.total).toBe(5);
    expect(result.users).toHaveLength(1); // Última página deve ter apenas 1 usuário
  });
});