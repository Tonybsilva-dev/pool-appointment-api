import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user/delete-user.use-case';

export async function deleteUserController(req: Request, res: Response) {
  const { id } = req.params;
  const repo = new PrismaUserRepository();
  const useCase = new DeleteUserUseCase(repo);

  await useCase.execute(id);
  return res.status(204).send();
}