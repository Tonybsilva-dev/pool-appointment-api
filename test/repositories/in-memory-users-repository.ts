import { PaginationParams } from "@/core/repositories/pagination-params";
import { User } from "@/modules/users/domain/entities/user";
import { UserRepository } from "@/modules/users/domain/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id.toString() === id) || null;
  }

  async findAll({ page = 1, perPage = 10 }: PaginationParams): Promise<{ total: number; users: User[] }> {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const users = this.users.slice(start, end);
    return { total: this.users.length, users };
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id.toString() === user.id.toString());
    if (index >= 0) {
      this.users[index] = user;
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      user.delete();
      await this.update(user);
    }
  }

  async count(): Promise<number> {
    return this.users.length;
  }
}