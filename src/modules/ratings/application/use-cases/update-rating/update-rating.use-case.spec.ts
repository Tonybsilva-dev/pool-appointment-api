import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository';
import { UpdateRatingUseCase } from './update-rating.use-case';
import { makeRating } from 'test/factories/make-rating';
import { makeSpace } from 'test/factories/make-space';

describe('UpdateRatingUseCase', () => {
  let ratingRepo: InMemoryRatingRepository;
  let spaceRepo: InMemorySpacesRepository;
  let useCase: UpdateRatingUseCase;

  beforeEach(() => {
    ratingRepo = new InMemoryRatingRepository();
    spaceRepo = new InMemorySpacesRepository();
    useCase = new UpdateRatingUseCase(ratingRepo, spaceRepo);
  });

  it('should update a rating', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const rating = makeRating({ spaceId: space.id.toString() });
    await ratingRepo.create(rating);

    const result = await useCase.execute({
      id: rating.id.toString(),
      score: 4,
      comment: 'Espaço atualizado!',
    });

    expect(result).toBeDefined();
    expect(result.score).toBe(4);
    expect(result.comment).toBe('Espaço atualizado!');

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(4);
  });

  it('should update only score', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const rating = makeRating({
      spaceId: space.id.toString(),
      comment: 'Comentário original'
    });
    await ratingRepo.create(rating);

    const result = await useCase.execute({
      id: rating.id.toString(),
      score: 3,
    });

    expect(result).toBeDefined();
    expect(result.score).toBe(3);
    expect(result.comment).toBe('Comentário original');

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(3);
  });

  it('should throw error if rating not found', async () => {
    await expect(useCase.execute({
      id: 'non-existent-id',
      score: 4,
    })).rejects.toThrow('Rating not found');
  });

  it('should throw error if score is less than 1', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const rating = makeRating({ spaceId: space.id.toString() });
    await ratingRepo.create(rating);

    await expect(useCase.execute({
      id: rating.id.toString(),
      score: 0,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should throw error if score is greater than 5', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const rating = makeRating({ spaceId: space.id.toString() });
    await ratingRepo.create(rating);

    await expect(useCase.execute({
      id: rating.id.toString(),
      score: 6,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should update space average rating when multiple ratings are updated', async () => {
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
      score: 4,
    });

    await useCase.execute({
      id: rating2.id.toString(),
      score: 5,
    });

    await useCase.execute({
      id: rating3.id.toString(),
      score: 3,
    });

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(4);
  });
}); 