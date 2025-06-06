import { Request, Response } from 'express';
import { PrismaRatingRepository } from '../../infra/repositories/prisma-rating-repository';
import { FindRatingsByUserIdUseCase } from '../../application/use-cases/find-ratings-by-user-id/find-ratings-by-user-id.use-case';
import { prisma } from '@/config/prisma';

export async function findRatingsByUserIdController(req: Request, res: Response) {
  const { userId } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  const ratingRepo = new PrismaRatingRepository(prisma);
  const useCase = new FindRatingsByUserIdUseCase(ratingRepo);

  const result = await useCase.execute(userId, {
    page: Number(page),
    perPage: Number(perPage),
  });

  return res.json(result);
} 