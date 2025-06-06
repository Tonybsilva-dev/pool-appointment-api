import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository';
import { DeleteRatingUseCase } from './delete-rating.use-case';
import { makeRating } from 'test/factories/make-rating';
import { makeSpace } from 'test/factories/make-space';

describe('DeleteRatingUseCase', () => {
  let ratingRepo: InMemoryRatingRepository;
  let spaceRepo: InMemorySpacesRepository;
  let useCase: DeleteRatingUseCase;

  beforeEach(() => {
    ratingRepo = new InMemoryRatingRepository();
    spaceRepo = new InMemorySpacesRepository();
    useCase = new DeleteRatingUseCase(ratingRepo, spaceRepo);
  });

  it('should delete a rating', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const rating = makeRating({ spaceId: space.id.toString() });
    await ratingRepo.create(rating);

    await useCase.execute({
      id: rating.id.toString(),
    });

    const deletedRating = await ratingRepo.findById(rating.id.toString());
    expect(deletedRating).toBeNull();

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(0);
  });

  it('should throw error if rating not found', async () => {
    await expect(useCase.execute({
      id: 'non-existent-id',
    })).rejects.toThrow('Rating not found');
  });

  it('should update space average rating when multiple ratings are deleted', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const rating1 = makeRating({
      spaceId: space.id.toString(),
      score: 5
    });
    const rating2 = makeRating({
      spaceId: space.id.toString(),
      score: 3
    });
    const rating3 = makeRating({
      spaceId: space.id.toString(),
      score: 4
    });

    await ratingRepo.create(rating1);
    await ratingRepo.create(rating2);
    await ratingRepo.create(rating3);

    await useCase.execute({
      id: rating1.id.toString(),
    });

    await useCase.execute({
      id: rating2.id.toString(),
    });

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(4);
  });
}); 