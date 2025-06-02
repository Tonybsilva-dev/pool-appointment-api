import { PaginationParams } from '@/core/repositories/pagination-params';
import { User } from '../entities/user';

export interface UserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(params: PaginationParams): Promise<{ total: number; users: User[] }>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
