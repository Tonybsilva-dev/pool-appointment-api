import { User } from "@/modules/users/domain/entities/user";
import { UserRepository } from "@/modules/users/domain/repositories/user-repository";

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}