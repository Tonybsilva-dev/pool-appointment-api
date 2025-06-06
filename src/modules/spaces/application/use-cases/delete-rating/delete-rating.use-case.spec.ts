import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { DeleteRatingUseCase } from './delete-rating.use-case';
import { makeRating } from 'test/factories/make-rating';

describe('DeleteRatingUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: DeleteRatingUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new DeleteRatingUseCase(repo);
  });

  it('should delete a rating', async () => {
    const rating = makeRating();
    await repo.create(rating);

    await useCase.execute(rating.id.toString());

    const deletedRating = await repo.findById(rating.id.toString());
    expect(deletedRating).toBeNull();
  });

  it('should throw error if rating not found', async () => {
    await expect(useCase.execute('non-existent-id')).rejects.toThrow('Rating not found');
  });
}); 