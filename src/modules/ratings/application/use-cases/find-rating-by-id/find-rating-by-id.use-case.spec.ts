import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { FindRatingByIdUseCase } from './find-rating-by-id.use-case';
import { makeRating } from 'test/factories/make-rating';

describe('FindRatingByIdUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: FindRatingByIdUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new FindRatingByIdUseCase(repo);
  });

  it('should find rating by id', async () => {
    const rating = makeRating();
    await repo.create(rating);

    const result = await useCase.execute(rating.id.toString());

    expect(result).toBeDefined();
    expect(result?.id.toString()).toBe(rating.id.toString());
    expect(result?.spaceId).toBe(rating.spaceId);
    expect(result?.userId).toBe(rating.userId);
    expect(result?.score).toBe(rating.score);
    expect(result?.comment).toBe(rating.comment);
  });

  it('should return null when rating not found', async () => {
    const result = await useCase.execute('non-existent-id');
    expect(result).toBeNull();
  });
}); 