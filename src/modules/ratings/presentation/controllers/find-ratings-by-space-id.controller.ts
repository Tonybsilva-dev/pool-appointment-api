import { Request, Response } from 'express';
import { PrismaRatingRepository } from '../../infra/repositories/prisma-rating-repository';
import { FindRatingsBySpaceIdUseCase } from '../../application/use-cases/find-ratings-by-space-id/find-ratings-by-space-id.use-case';
import { prisma } from '@/config/prisma';

export async function findRatingsBySpaceIdController(req: Request, res: Response) {
  const { spaceId } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  const ratingRepo = new PrismaRatingRepository(prisma);
  const useCase = new FindRatingsBySpaceIdUseCase(ratingRepo);

  const result = await useCase.execute(spaceId, {
    page: Number(page),
    perPage: Number(perPage),
  });

  return res.json(result);
} 