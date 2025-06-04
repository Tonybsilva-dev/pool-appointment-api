import { SpaceRepository } from '../../domain/repositories/space-repository';
import { Space } from '../../domain/entities/space';
import { prisma } from '@/config/prisma';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams, toPrismaPagination } from '@/core/repositories/pagination-params';

export class PrismaSpaceRepository implements SpaceRepository {

  async create(space: Space): Promise<void> {
    await prisma.space.create({
      data: {
        id: space.id.toString(),
        title: space.title,
        description: space.description,
        photos: space.photos,
        rules: space.rules,
        hostId: space.hostId,
        createdAt: space.createdAt,
        updatedAt: space.updatedAt,
      }
    })
  }

  async findById(id: string): Promise<Space | null> {
    const space = await prisma.space.findUnique({ where: { id } })
    if (!space) return null

    return Space.create(
      {
        title: space.title,
        description: space.description,
        photos: space.photos,
        rules: space.rules,
        hostId: space.hostId,
        createdAt: space.createdAt,
        updatedAt: space.updatedAt,
      },
      new UniqueEntityID(space.id)
    )
  }

  async findAll(params: PaginationParams): Promise<{ total: number, spaces: Space[] }> {
    const { skip, take } = toPrismaPagination(params)

    const [spaces, total] = await Promise.all([
      prisma.space.findMany({
        skip,
        take,
        where: { deletedAt: null },
      }),
      prisma.space.count({
        where: { deletedAt: null },
      })
    ])

    const mappedSpaces = await Promise.all(spaces.map((space) => {
      return Space.create(
        {
          title: space.title,
          description: space.description,
          photos: space.photos,
          rules: space.rules,
          hostId: space.hostId,
          createdAt: space.createdAt,
          updatedAt: space.updatedAt,
        },
        new UniqueEntityID(space.id)
      )
    }))

    return { total, spaces: mappedSpaces }
  }

  async update(space: Space): Promise<void> {
    await prisma.space.update({
      where: { id: space.id.toString() },
      data: {
        title: space.title,
        description: space.description,
        photos: space.photos,
        rules: space.rules,
        hostId: space.hostId,
        updatedAt: space.updatedAt,
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.space.delete({ where: { id } })
  }
}