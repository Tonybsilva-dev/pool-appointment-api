import { RatingRepository } from "../../../domain/repositories/rating-repository";
import { Rating } from "../../../domain/entities/rating";

interface UpdateRatingDTO {
  id: string;
  score?: number;
  comment?: string;
}

export class UpdateRatingUseCase {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async execute(data: UpdateRatingDTO): Promise<Rating> {
    const rating = await this.ratingRepository.findById(data.id);

    if (!rating) {
      throw new Error('Rating not found');
    }

    if (data.score !== undefined) {
      rating.updateScore(data.score);
    }

    if (data.comment !== undefined) {
      rating.updateComment(data.comment);
    }

    await this.ratingRepository.update(rating);
    return rating;
  }
} 