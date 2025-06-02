import { UserRepository } from "@/modules/users/domain/repositories/user-repository";

export class CountUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(): Promise<number> {
    return this.userRepository.count();
  }
}