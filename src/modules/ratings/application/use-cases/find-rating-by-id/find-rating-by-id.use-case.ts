import { RatingRepository } from "../../../domain/repositories/rating-repository";
import { Rating } from "../../../domain/entities/rating";

export class FindRatingByIdUseCase {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async execute(id: string): Promise<Rating | null> {
    return this.ratingRepository.findById(id);
  }
} 