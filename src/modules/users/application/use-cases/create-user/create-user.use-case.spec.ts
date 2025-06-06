import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '@/modules/users/domain/entities/user';
import { CreateUserUseCase } from './create-user.use-case';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { UserStatus, UserRole } from '@prisma/client';

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
      role: 'USER',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe('john@example.com');
    expect(user.name).toBe('John Doe');
    expect(user.status).toBe('ACTIVE');
    expect(user.role).toBe('USER');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    const total = await userRepository.count();
    expect(total).toBe(1);
  });

  it('should not allow duplicate emails', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      status: 'ACTIVE',
      role: 'USER',
    });

    await expect(() =>
      createUserUseCase.execute({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'abcdef',
        status: 'ACTIVE',
        role: 'USER',
      }),
    ).rejects.toThrow('User already exists');

    const total = await userRepository.count();
    expect(total).toBe(1);
  });

  it('should create admin user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      status: 'ACTIVE',
      role: 'ADMIN',
    });

    expect(user.role).toBe('ADMIN');
  });

  it('should create inactive user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Inactive User',
      email: 'inactive@example.com',
      password: '123456',
      status: 'INACTIVE',
      role: 'USER',
    });

    expect(user.status).toBe('INACTIVE');
  });

  it('should hash password', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      status: 'ACTIVE',
      role: 'USER',
    });

    expect(user.password.value).not.toBe('123456');
    expect(user.password.value).toMatch(/^\$2[aby]\$\d+\$/); // Verifica se é um hash bcrypt
  });

  it('should be case insensitive for email uniqueness', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'John.Doe@Example.com',
      password: '123456',
      status: 'ACTIVE',
      role: 'USER',
    });

    await expect(() =>
      createUserUseCase.execute({
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        password: 'abcdef',
        status: 'ACTIVE',
        role: 'USER',
      }),
    ).rejects.toThrow('User already exists');
  });
});