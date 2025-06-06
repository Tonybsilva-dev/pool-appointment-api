import { RatingRepository } from "../../../domain/repositories/rating-repository";
import { Rating } from "../../../domain/entities/rating";
import { UpdateSpaceAverageRating } from "../../../domain/services/update-space-average-rating";
import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";

interface UpdateRatingDTO {
  id: string;
  score?: number;
  comment?: string;
}

export class UpdateRatingUseCase {
  private updateSpaceAverageRating: UpdateSpaceAverageRating;

  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly spaceRepository: SpaceRepository,
  ) {
    this.updateSpaceAverageRating = new UpdateSpaceAverageRating(
      ratingRepository,
      spaceRepository,
    );
  }

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
    await this.updateSpaceAverageRating.execute(rating.spaceId);

    return rating;
  }
} 