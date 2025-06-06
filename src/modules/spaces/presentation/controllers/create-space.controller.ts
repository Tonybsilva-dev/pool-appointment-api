import { Request, Response } from 'express'
import { CreateSpaceUseCase } from '@/modules/spaces/application/use-cases/create-space/create-space.use-case'
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space-repository'

export async function createSpaceController(req: Request, res: Response) {
  const { title, description, photos, rules, hostId } = req.body
  const repo = new PrismaSpaceRepository()
  const useCase = new CreateSpaceUseCase(repo)

  const space = await useCase.execute({ title, description, photos, rules, hostId })

  return res.status(201).json(space)
}