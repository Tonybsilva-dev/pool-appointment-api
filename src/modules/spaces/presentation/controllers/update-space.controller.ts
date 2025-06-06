import { Request, Response } from 'express'
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space-repository'
import { UpdateSpaceUseCase } from '@/modules/spaces/application/use-cases/update-space/update-space.use-case'

export async function updateSpaceController(req: Request, res: Response) {
  const { id } = req.params
  const { title, description, photos, rules } = req.body

  const repo = new PrismaSpaceRepository()
  const useCase = new UpdateSpaceUseCase(repo)

  const space = await useCase.execute({
    id,
    title,
    description,
    photos,
    rules,
  })

  return res.status(200).json(space)
}