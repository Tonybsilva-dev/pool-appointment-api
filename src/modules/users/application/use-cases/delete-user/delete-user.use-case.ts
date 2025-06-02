import { UserRepository } from "@/modules/users/domain/repositories/user-repository";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}