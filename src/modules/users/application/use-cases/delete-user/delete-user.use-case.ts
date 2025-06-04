import { UserRepository } from "@/modules/users/domain/repositories/user-repository";
import { UserStatus } from "@prisma/client";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    user.updateStatus('INACTIVE' as UserStatus);
    user.delete();

    await this.userRepository.update(user);
  }
}