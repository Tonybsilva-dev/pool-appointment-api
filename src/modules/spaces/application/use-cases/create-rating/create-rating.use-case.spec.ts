import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRatingRepository } from 'test/repositories/in-memory-ratings-repository';
import { CreateRatingUseCase } from './create-rating.use-case';
import { makeSpace } from 'test/factories/make-space';
import { makeUser } from 'test/factories/make-user';

describe('CreateRatingUseCase', () => {
  let repo: InMemoryRatingRepository;
  let useCase: CreateRatingUseCase;

  beforeEach(() => {
    repo = new InMemoryRatingRepository();
    useCase = new CreateRatingUseCase(repo);
  });

  it('should create a new rating', async () => {
    const space = await makeSpace();
    const user = await makeUser();

    const result = await useCase.execute({
      spaceId: space.id.toString(),
      userId: user.id.toString(),
      score: 5,
      comment: 'Ótimo espaço!',
    });

    expect(result).toBeDefined();
    expect(result.spaceId).toBe(space.id.toString());
    expect(result.userId).toBe(user.id.toString());
    expect(result.score).toBe(5);
    expect(result.comment).toBe('Ótimo espaço!');
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a rating without comment', async () => {
    const space = await makeSpace();
    const user = await makeUser();

    const result = await useCase.execute({
      spaceId: space.id.toString(),
      userId: user.id.toString(),
      score: 4,
    });

    expect(result).toBeDefined();
    expect(result.comment).toBeUndefined();
  });

  it('should throw error if score is less than 1', async () => {
    const space = await makeSpace();
    const user = await makeUser();

    await expect(useCase.execute({
      spaceId: space.id.toString(),
      userId: user.id.toString(),
      score: 0,
    })).rejects.toThrow('Score must be between 1 and 5');
  });

  it('should throw error if score is greater than 5', async () => {
    const space = await makeSpace();
    const user = await makeUser();

    await expect(useCase.execute({
      spaceId: space.id.toString(),
      userId: user.id.toString(),
      score: 6,
    })).rejects.toThrow('Score must be between 1 and 5');
  });
}); 