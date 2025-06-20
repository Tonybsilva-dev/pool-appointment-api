import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/entities/user';
import { prisma } from '@/config/prisma';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams, toPrismaPagination } from '@/core/repositories/pagination-params';
import { Password } from '../../domain/entities/value-objects/password';

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        password: user.password.value,
        status: user.status,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { email } });
    if (!data) return null;

    return User.create({
      name: data.name,
      email: data.email,
      password: await Password.create(data.password, true),
      status: data.status,
    }, new UniqueEntityID(data.id));
  }

  async findById(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { id } });
    if (!data) return null;

    return User.create({
      name: data.name,
      email: data.email,
      password: await Password.create(data.password, true),
      status: data.status,
    }, new UniqueEntityID(data.id));
  }

  async findAll(params: PaginationParams): Promise<{ total: number; users: User[] }> {
    const { skip, take } = toPrismaPagination(params);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        where: { deletedAt: null },
      }),
      prisma.user.count({
        where: { deletedAt: null },
      })
    ]);

    const mappedUsers = await Promise.all(
      users.map(async user =>
        User.create({
          name: user.name,
          email: user.email,
          password: await Password.create(user.password, true),
          status: user.status,
        }, new UniqueEntityID(user.id))
      )
    );

    return { total, users: mappedUsers };
  }

  async update(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id.toString() },
      data: {
        name: user.name,
        email: user.email,
        password: user.password.value,
        status: user.status,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async count(): Promise<number> {
    return prisma.user.count({
      where: { deletedAt: null },
    });
  }
}