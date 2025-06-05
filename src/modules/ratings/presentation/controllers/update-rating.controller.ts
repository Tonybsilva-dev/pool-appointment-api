import { Request, Response } from 'express';
import { PrismaRatingRepository } from '../../infra/repositories/prisma-rating-repository';
import { PrismaSpaceRepository } from '@/modules/spaces/infra/repositories/prisma-space-repository';
import { UpdateRatingUseCase } from '../../application/use-cases/update-rating/update-rating.use-case';
import { prisma } from '@/config/prisma';

export async function updateRatingController(req: Request, res: Response) {
  const { id } = req.params;
  const { score, comment } = req.body;

  const ratingRepo = new PrismaRatingRepository(prisma);
  const spaceRepo = new PrismaSpaceRepository();
  const useCase = new UpdateRatingUseCase(ratingRepo, spaceRepo);

  const rating = await useCase.execute({
    id,
    score,
    comment,
  });

  return res.json(rating);
} 