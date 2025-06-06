import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository';
import { CreateRatingUseCase } from './create-rating.use-case';
import { makeRating } from 'test/factories/make-rating';
import { makeSpace } from 'test/factories/make-space';

describe('CreateRatingUseCase', () => {
  let ratingRepo: InMemoryRatingRepository;
  let spaceRepo: InMemorySpacesRepository;
  let useCase: CreateRatingUseCase;

  beforeEach(() => {
    ratingRepo = new InMemoryRatingRepository();
    spaceRepo = new InMemorySpacesRepository();
    useCase = new CreateRatingUseCase(ratingRepo, spaceRepo);
  });

  it('should create a new rating', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const result = await useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-123',
      score: 5,
      comment: 'Ótimo espaço!',
    });

    expect(result).toBeDefined();
    expect(result.score).toBe(5);
    expect(result.comment).toBe('Ótimo espaço!');

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(5);
  });

  it('should create a rating without comment', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    const result = await useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-123',
      score: 4,
    });

    expect(result).toBeDefined();
    expect(result.score).toBe(4);
    expect(result.comment).toBeUndefined();

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(4);
  });

  it('should throw error if score is less than 1', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    await expect(useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-123',
      score: 0,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should throw error if score is greater than 5', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    await expect(useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-123',
      score: 6,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should update space average rating when multiple ratings are created', async () => {
    const space = makeSpace();
    await spaceRepo.create(space);

    await useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-1',
      score: 5,
    });

    await useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-2',
      score: 3,
    });

    await useCase.execute({
      spaceId: space.id.toString(),
      userId: 'user-3',
      score: 4,
    });

    const updatedSpace = await spaceRepo.findById(space.id.toString());
    expect(updatedSpace?.averageRating).toBe(4);
  });
}); 