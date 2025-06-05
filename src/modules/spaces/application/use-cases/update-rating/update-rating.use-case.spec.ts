import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { UpdateRatingUseCase } from './update-rating.use-case';
import { makeRating } from 'test/factories/make-rating';

describe('UpdateRatingUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: UpdateRatingUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new UpdateRatingUseCase(repo);
  });

  it('should update rating score', async () => {
    const rating = makeRating();
    await repo.create(rating);

    const result = await useCase.execute({
      id: rating.id.toString(),
      score: 4,
    });

    expect(result.score).toBe(4);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should update rating comment', async () => {
    const rating = makeRating();
    await repo.create(rating);

    const result = await useCase.execute({
      id: rating.id.toString(),
      comment: 'Novo comentário',
    });

    expect(result.comment).toBe('Novo comentário');
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw error if score is less than 1', async () => {
    const rating = makeRating();
    await repo.create(rating);

    await expect(useCase.execute({
      id: rating.id.toString(),
      score: 0,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should throw error if score is greater than 5', async () => {
    const rating = makeRating();
    await repo.create(rating);

    await expect(useCase.execute({
      id: rating.id.toString(),
      score: 6,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should throw error if rating not found', async () => {
    await expect(useCase.execute({
      id: 'non-existent-id',
      score: 4,
    })).rejects.toThrow('Rating not found');
  });
}); 