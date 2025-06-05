import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { FindRatingsBySpaceIdUseCase } from './find-ratings-by-space-id.use-case';
import { makeRating } from 'test/factories/make-rating';

describe('FindRatingsBySpaceIdUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: FindRatingsBySpaceIdUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new FindRatingsBySpaceIdUseCase(repo);
  });

  it('should list ratings by space id', async () => {
    const spaceId = 'space-123';
    const ratings = [
      makeRating({ spaceId }),
      makeRating({ spaceId }),
      makeRating({ spaceId }),
    ];

    for (const rating of ratings) {
      await repo.create(rating);
    }

    const result = await useCase.execute(spaceId, { page: 1, perPage: 10 });

    expect(result.total).toBe(3);
    expect(result.ratings).toHaveLength(3);
    expect(result.ratings[0].spaceId).toBe(spaceId);
  });

  it('should return empty list when no ratings found', async () => {
    const result = await useCase.execute('non-existent-space', { page: 1, perPage: 10 });

    expect(result.total).toBe(0);
    expect(result.ratings).toHaveLength(0);
  });

  it('should return correct page of ratings', async () => {
    const spaceId = 'space-123';
    const ratings = [
      makeRating({ spaceId }),
      makeRating({ spaceId }),
      makeRating({ spaceId }),
    ];

    for (const rating of ratings) {
      await repo.create(rating);
    }

    const result = await useCase.execute(spaceId, { page: 1, perPage: 2 });

    expect(result.total).toBe(3);
    expect(result.ratings).toHaveLength(2);
  });
}); 