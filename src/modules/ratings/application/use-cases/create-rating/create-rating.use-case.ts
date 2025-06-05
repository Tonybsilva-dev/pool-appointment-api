import { RatingRepository } from "../../../domain/repositories/rating-repository";
import { Rating } from "../../../domain/entities/rating";
import { UpdateSpaceAverageRating } from "../../../domain/services/update-space-average-rating";
import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface CreateRatingDTO {
  spaceId: string;
  userId: string;
  score: number;
  comment?: string;
}

export class CreateRatingUseCase {
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

  async execute(data: CreateRatingDTO): Promise<Rating> {
    const space = await this.spaceRepository.findById(data.spaceId);
    if (!space) {
      throw new ResourceNotFoundError('Space');
    }

    const rating = Rating.create({
      spaceId: data.spaceId,
      userId: data.userId,
      score: data.score,
      comment: data.comment,
    });

    await this.ratingRepository.create(rating);
    await this.updateSpaceAverageRating.execute(data.spaceId);

    return rating;
  }
} 