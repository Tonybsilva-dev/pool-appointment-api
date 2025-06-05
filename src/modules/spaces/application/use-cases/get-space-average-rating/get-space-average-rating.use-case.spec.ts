import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { GetSpaceAverageRatingUseCase } from './get-space-average-rating.use-case';
import { makeRating } from 'test/factories/make-rating';

describe('GetSpaceAverageRatingUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: GetSpaceAverageRatingUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new GetSpaceAverageRatingUseCase(repo);
  });

  it('should return average score for a space', async () => {
    const spaceId = 'space-123';
    await repo.create(makeRating({ spaceId, score: 5 }));
    await repo.create(makeRating({ spaceId, score: 3 }));
    await repo.create(makeRating({ spaceId, score: 4 }));

    const avg = await useCase.execute(spaceId);
    expect(avg).toBeCloseTo(4);
  });

  it('should return 0 if no ratings for space', async () => {
    const avg = await useCase.execute('non-existent-space');
    expect(avg).toBe(0);
  });
}); 