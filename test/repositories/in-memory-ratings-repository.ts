import { Rating } from '@/modules/ratings/domain/entities/rating';
import { RatingRepository } from '@/modules/ratings/domain/repositories/rating-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

export class InMemoryRatingRepository implements RatingRepository {
  public items: Rating[] = [];

  async create(rating: Rating): Promise<void> {
    this.items.push(rating);
  }

  async findById(id: string): Promise<Rating | null> {
    const rating = this.items.find(item => item.id.toString() === id);
    return rating ?? null;
  }

  async findBySpaceId(spaceId: string, { page = 1, perPage = 10 }: PaginationParams) {
    const ratings = this.items
      .filter(item => item.spaceId === spaceId)
      .slice((page - 1) * perPage, page * perPage);

    const total = this.items.filter(item => item.spaceId === spaceId).length;

    return {
      ratings,
      total,
    };
  }

  async findByUserId(userId: string, { page = 1, perPage = 10 }: PaginationParams) {
    const ratings = this.items
      .filter(item => item.userId === userId)
      .slice((page - 1) * perPage, page * perPage);

    const total = this.items.filter(item => item.userId === userId).length;

    return {
      ratings,
      total,
    };
  }

  async update(rating: Rating): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id.toString() === rating.id.toString());

    if (itemIndex >= 0) {
      this.items[itemIndex] = rating;
    }
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id.toString() === id);

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
    }
  }

  async countBySpaceId(spaceId: string): Promise<number> {
    return this.items.filter(item => item.spaceId === spaceId).length;
  }

  async getAverageScoreBySpaceId(spaceId: string): Promise<number> {
    const ratings = this.items.filter(item => item.spaceId === spaceId);
    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return sum / ratings.length;
  }
} 