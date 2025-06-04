import { UserRepository } from '../../../domain/repositories/user-repository';
import { User } from '../../../domain/entities/user';

interface AuthenticateDTO {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(data: AuthenticateDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.status === 'INACTIVE' || user.deletedAt) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await user.password.compare(data.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}