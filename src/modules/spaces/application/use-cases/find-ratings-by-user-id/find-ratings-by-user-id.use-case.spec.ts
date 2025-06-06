import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { FindRatingsByUserIdUseCase } from './find-ratings-by-user-id.use-case';
import { makeRating } from 'test/factories/make-rating';

describe('FindRatingsByUserIdUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: FindRatingsByUserIdUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new FindRatingsByUserIdUseCase(repo);
  });

  it('should list ratings by user id', async () => {
    const userId = 'user-123';
    const ratings = [
      makeRating({ userId }),
      makeRating({ userId }),
      makeRating({ userId }),
    ];

    for (const rating of ratings) {
      await repo.create(rating);
    }

    const result = await useCase.execute(userId, { page: 1, perPage: 10 });

    expect(result.total).toBe(3);
    expect(result.ratings).toHaveLength(3);
    expect(result.ratings[0].userId).toBe(userId);
  });

  it('should return empty list when no ratings found', async () => {
    const result = await useCase.execute('non-existent-user', { page: 1, perPage: 10 });

    expect(result.total).toBe(0);
    expect(result.ratings).toHaveLength(0);
  });

  it('should return correct page of ratings', async () => {
    const userId = 'user-123';
    const ratings = [
      makeRating({ userId }),
      makeRating({ userId }),
      makeRating({ userId }),
    ];

    for (const rating of ratings) {
      await repo.create(rating);
    }

    const result = await useCase.execute(userId, { page: 1, perPage: 2 });

    expect(result.total).toBe(3);
    expect(result.ratings).toHaveLength(2);
  });
}); 