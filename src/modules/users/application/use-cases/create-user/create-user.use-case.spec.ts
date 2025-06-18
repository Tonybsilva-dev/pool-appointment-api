import { describe, it, expect, beforeEach } from 'vitest';
import { CreateUserUseCase } from './create-user.use-case';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { makeUser } from 'test/factories/make-user';
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
      password: 'password123',
      status: UserStatus.ACTIVE,
      role: UserRole.USER,
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.role).toBe(UserRole.USER);
    expect(user.password.value).toMatch(/^\$2[aby]\$\d+\$/);

    const total = await userRepository.count();
    expect(total).toBe(1);
  });

  it('should create user with custom role', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      status: UserStatus.ACTIVE,
      role: UserRole.ADMIN,
    });

    expect(user.role).toBe(UserRole.ADMIN);
  });

  it('should create user with custom status', async () => {
    const user = await createUserUseCase.execute({
      name: 'Inactive User',
      email: 'inactive@example.com',
      password: 'password123',
      status: UserStatus.INACTIVE,
      role: UserRole.USER,
    });

    expect(user.status).toBe(UserStatus.INACTIVE);
  });

  it('should throw error if email already exists', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      status: UserStatus.ACTIVE,
      role: UserRole.USER,
    });

    await expect(() =>
      createUserUseCase.execute({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password456',
        status: UserStatus.ACTIVE,
        role: UserRole.USER,
      }),
    ).rejects.toThrow('User already exists');
  });

  it('should create multiple users with different emails', async () => {
    await createUserUseCase.execute({
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password123',
      status: UserStatus.ACTIVE,
      role: UserRole.USER,
    });

    await createUserUseCase.execute({
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password456',
      status: UserStatus.ACTIVE,
      role: UserRole.USER,
    });

    const total = await userRepository.count();
    expect(total).toBe(2);
  });

  it('should hash password correctly', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      status: UserStatus.ACTIVE,
      role: UserRole.USER,
    });

    expect(user.password.value).toMatch(/^\$2[aby]\$\d+\$/);
    expect(user.password.value).not.toBe('password123');
  });
});