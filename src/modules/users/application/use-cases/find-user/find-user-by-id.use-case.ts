import { User } from "@/modules/users/domain/entities/user";
import { UserRepository } from "@/modules/users/domain/repositories/user-repository";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}