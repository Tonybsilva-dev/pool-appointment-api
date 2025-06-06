import { Request, Response } from 'express';
import { PrismaRatingRepository } from '../../infra/repositories/prisma-rating-repository';
import { PrismaSpaceRepository } from '@/modules/spaces/infra/repositories/prisma-space-repository';
import { DeleteRatingUseCase } from '../../application/use-cases/delete-rating/delete-rating.use-case';
import { prisma } from '@/config/prisma';

export async function deleteRatingController(req: Request, res: Response) {
  const { id } = req.params;

  const ratingRepo = new PrismaRatingRepository(prisma);
  const spaceRepo = new PrismaSpaceRepository();
  const useCase = new DeleteRatingUseCase(ratingRepo, spaceRepo);

  await useCase.execute({ id });

  return res.status(204).send();
} 