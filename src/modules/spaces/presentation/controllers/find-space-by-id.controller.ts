import { Request, Response } from 'express'
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space-repository'
import { FindSpaceByIdUseCase } from '../../application/use-cases/find-space/find-space-by-id.use-case'

export async function findSpaceByIdController(req: Request, res: Response) {
  const { id } = req.params

  const repo = new PrismaSpaceRepository()
  const useCase = new FindSpaceByIdUseCase(repo)

  const space = await useCase.execute(id)

  return res.json(space)
}