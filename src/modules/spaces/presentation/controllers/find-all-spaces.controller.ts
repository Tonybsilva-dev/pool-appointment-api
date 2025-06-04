import { Request, Response } from 'express'
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space-repository'
import { FindAllSpacesUseCase } from '../../application/use-cases/find-space/find-all-spaces.use-case';

export async function findAllSpacesController(req: Request, res: Response) {
  const pagination = req.pagination;
  const repo = new PrismaSpaceRepository()
  const useCase = new FindAllSpacesUseCase(repo)

  const { total, spaces } = await useCase.execute(pagination ?? {})

  return res.status(200).json({ total, spaces })
}