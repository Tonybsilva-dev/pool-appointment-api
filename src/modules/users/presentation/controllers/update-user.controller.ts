import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';

export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;

  const repo = new PrismaUserRepository();
  const useCase = new UpdateUserUseCase(repo);

  const user = await useCase.execute({ id, ...data });
  return res.json(user);
}