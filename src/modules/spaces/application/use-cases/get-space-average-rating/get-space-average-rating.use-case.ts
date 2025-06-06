import { RatingRepository } from "../../../domain/repositories/rating-repository";

export class GetSpaceAverageRatingUseCase {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async execute(spaceId: string): Promise<number> {
    return this.ratingRepository.getAverageScoreBySpaceId(spaceId);
  }
} 