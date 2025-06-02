import { PaginationParams } from '@/core/repositories/pagination-params';
import { User } from '@/modules/users/domain/entities/user';
import { UserRepository } from '@/modules/users/domain/repositories/user-repository';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(params: PaginationParams): Promise<{ total: number; users: User[] }> {
    return this.userRepository.findAll(params);
  }
}