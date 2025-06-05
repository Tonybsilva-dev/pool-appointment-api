import { RatingRepository } from "../../../domain/repositories/rating-repository";

export class DeleteRatingUseCase {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async execute(id: string): Promise<void> {
    const rating = await this.ratingRepository.findById(id);

    if (!rating) {
      throw new Error('Rating not found');
    }

    await this.ratingRepository.delete(id);
  }
} 