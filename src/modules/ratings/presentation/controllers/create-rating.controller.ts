import { Request, Response } from 'express';
import { PrismaRatingRepository } from '../../infra/repositories/prisma-rating-repository';
import { PrismaSpaceRepository } from '@/modules/spaces/infra/repositories/prisma-space-repository';
import { CreateRatingUseCase } from '../../application/use-cases/create-rating/create-rating.use-case';
import { prisma } from '@/config/prisma';

export async function createRatingController(req: Request, res: Response) {
  const { spaceId, userId, score, comment } = req.body;

  const ratingRepo = new PrismaRatingRepository(prisma);
  const spaceRepo = new PrismaSpaceRepository();
  const useCase = new CreateRatingUseCase(ratingRepo, spaceRepo);

  const rating = await useCase.execute({
    spaceId,
    userId,
    score,
    comment,
  });

  return res.status(201).json(rating);
} 