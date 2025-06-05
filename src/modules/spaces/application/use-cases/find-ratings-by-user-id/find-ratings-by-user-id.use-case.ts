import { RatingRepository } from "../../../domain/repositories/rating-repository";
import { Rating } from "../../../domain/entities/rating";
import { PaginationParams } from "@/core/repositories/pagination-params";

export class FindRatingsByUserIdUseCase {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async execute(userId: string, params: PaginationParams): Promise<{ total: number; ratings: Rating[] }> {
    return this.ratingRepository.findByUserId(userId, params);
  }
} 