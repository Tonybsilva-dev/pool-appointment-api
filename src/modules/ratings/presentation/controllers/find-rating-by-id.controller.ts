import { Request, Response } from 'express';
import { PrismaRatingRepository } from '../../infra/repositories/prisma-rating-repository';
import { FindRatingByIdUseCase } from '../../application/use-cases/find-rating-by-id/find-rating-by-id.use-case';
import { prisma } from '@/config/prisma';

export async function findRatingByIdController(req: Request, res: Response) {
  const { id } = req.params;

  const ratingRepo = new PrismaRatingRepository(prisma);
  const useCase = new FindRatingByIdUseCase(ratingRepo);

  const rating = await useCase.execute(id);

  if (!rating) {
    return res.status(404).json({ message: 'Rating not found' });
  }

  return res.json(rating);
} 