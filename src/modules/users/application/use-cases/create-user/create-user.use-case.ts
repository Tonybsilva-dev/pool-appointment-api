import { UserRepository } from '../../../domain/repositories/user-repository';
import { User } from '../../../domain/entities/user';
import { UserStatus } from '@prisma/client';
import { Password } from '@/modules/users/domain/entities/value-objects/password';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(data: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) throw new Error('User already exists');

    const password = await Password.create(data.password);

    const user = User.create({
      name: data.name,
      email: data.email,
      password,
      status: data.status,
    });

    await this.userRepository.create(user);
    return user;
  }
}
