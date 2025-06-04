import { UserRepository } from "@/modules/users/domain/repositories/user-repository";
import { UserStatus, UserRole } from "@prisma/client";

interface UpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  status?: UserStatus;
  role?: UserRole;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(data: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findById(data.id);
    if (!user) throw new Error('User not found');

    if (data.name) user.updateName(data.name);
    if (data.email) user.updateEmail(data.email);
    if (data.status) user.updateStatus(data.status);
    if (data.role) user.updateRole(data.role);

    await this.userRepository.update(user);
  }
}