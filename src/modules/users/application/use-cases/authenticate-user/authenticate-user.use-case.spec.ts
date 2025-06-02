import { describe, it, expect, beforeEach } from 'vitest';
import { AuthenticateUserUseCase } from '@/modules/users/application/use-cases/authenticate-user/authenticate-user-use-case';
import { User } from '@/modules/users/domain/entities/user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { Password } from '@/modules/users/domain/entities/value-objects/password';
import { UserStatus } from '@prisma/client';

describe('AuthenticateUserUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it('should authenticate a user with correct credentials', async () => {
    const password = await Password.create('123456');

    const user = User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password,
      status: UserStatus.ACTIVE,
    });

    await userRepository.create(user);

    const result = await authenticateUserUseCase.execute({
      email: 'jane@example.com',
      password: '123456',
    });

    expect(result).toBeInstanceOf(User);
    expect(result.email).toBe('jane@example.com');
  });

  it('should throw an error if email is incorrect', async () => {
    await expect(() =>
      authenticateUserUseCase.execute({
        email: 'wrong@example.com',
        password: '123456',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw an error if password is incorrect', async () => {
    const password = await Password.create('123456');

    const user = User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password,
      status: UserStatus.ACTIVE,
    });

    await userRepository.create(user);

    await expect(() =>
      authenticateUserUseCase.execute({
        email: 'jane@example.com',
        password: 'wrongpass',
      })
    ).rejects.toThrow('Invalid credentials');
  });
});