import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user/find-user-by-id.use-case';

export async function findUserByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const repo = new PrismaUserRepository();
  const useCase = new FindUserByIdUseCase(repo);

  const user = await useCase.execute(id);
  return res.json(user);
}