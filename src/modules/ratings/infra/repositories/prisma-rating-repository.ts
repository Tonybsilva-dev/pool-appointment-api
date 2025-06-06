import { PrismaClient } from '@prisma/client';
import { RatingRepository } from '../../domain/repositories/rating-repository';
import { Rating } from '../../domain/entities/rating';
import { PaginationParams, toPrismaPagination } from '@/core/repositories/pagination-params';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaRatingRepository implements RatingRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async create(rating: Rating): Promise<void> {
    await this.prisma.rating.create({
      data: {
        id: rating.id.toString(),
        spaceId: rating.spaceId,
        userId: rating.userId,
        score: rating.score,
        comment: rating.comment,
        createdAt: rating.createdAt,
        updatedAt: rating.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Rating | null> {
    const data = await this.prisma.rating.findUnique({ where: { id } });
    if (!data) return null;

    return Rating.create({
      spaceId: data.spaceId,
      userId: data.userId,
      score: data.score,
      comment: data.comment || undefined,
    }, new UniqueEntityID(data.id));
  }

  async findBySpaceId(spaceId: string, params: PaginationParams): Promise<{ total: number; ratings: Rating[] }> {
    const { skip, take } = toPrismaPagination(params);

    const [ratings, total] = await Promise.all([
      this.prisma.rating.findMany({
        where: { spaceId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rating.count({ where: { spaceId } }),
    ]);

    return {
      total,
      ratings: ratings.map(data => Rating.create({
        spaceId: data.spaceId,
        userId: data.userId,
        score: data.score,
        comment: data.comment || undefined,
      }, new UniqueEntityID(data.id))),
    };
  }

  async findByUserId(userId: string, params: PaginationParams): Promise<{ total: number; ratings: Rating[] }> {
    const { skip, take } = toPrismaPagination(params);

    const [ratings, total] = await Promise.all([
      this.prisma.rating.findMany({
        where: { userId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rating.count({ where: { userId } }),
    ]);

    return {
      total,
      ratings: ratings.map(data => Rating.create({
        spaceId: data.spaceId,
        userId: data.userId,
        score: data.score,
        comment: data.comment || undefined,
      }, new UniqueEntityID(data.id))),
    };
  }

  async update(rating: Rating): Promise<void> {
    await this.prisma.rating.update({
      where: { id: rating.id.toString() },
      data: {
        score: rating.score,
        comment: rating.comment,
        updatedAt: rating.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.rating.delete({ where: { id } });
  }

  async countBySpaceId(spaceId: string): Promise<number> {
    return this.prisma.rating.count({ where: { spaceId } });
  }

  async getAverageScoreBySpaceId(spaceId: string): Promise<number> {
    const result = await this.prisma.rating.aggregate({
      where: { spaceId },
      _avg: { score: true },
    });
    return result._avg.score ?? 0;
  }
} 