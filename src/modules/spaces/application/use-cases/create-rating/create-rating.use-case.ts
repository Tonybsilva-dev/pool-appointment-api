import { RatingRepository } from "../../../domain/repositories/rating-repository";
import { Rating } from "../../../domain/entities/rating";

interface CreateRatingDTO {
  spaceId: string;
  userId: string;
  score: number;
  comment?: string;
}

export class CreateRatingUseCase {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async execute(data: CreateRatingDTO): Promise<Rating> {
    const rating = Rating.create({
      spaceId: data.spaceId,
      userId: data.userId,
      score: data.score,
      comment: data.comment,
    });

    await this.ratingRepository.create(rating);
    return rating;
  }
} 