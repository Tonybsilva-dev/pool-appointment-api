import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '@/modules/users/domain/entities/user';
import { CreateUserUseCase } from './create-user.use-case';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';

describe('CreateUserUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      status: 'ACTIVE',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe('john@example.com');
    expect(user.name).toBe('John Doe');
    expect(user.status).toBe('ACTIVE');

    const total = await userRepository.count();
    expect(total).toBe(1);
  });

  it('should not allow duplicate emails', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      status: 'ACTIVE',
    });

    await expect(() =>
      createUserUseCase.execute({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'abcdef',
        status: 'ACTIVE',
      }),
    ).rejects.toThrow('User already exists');

    const total = await userRepository.count();
    expect(total).toBe(1); // garante que não foi criado um segundo
  });
});