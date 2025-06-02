import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { FindAllUsersUseCase } from '../../application/use-cases/find-user/find-all-users.use-case';

export async function findAllUsersController(req: Request, res: Response) {
  const pagination = req.pagination;
  const repo = new PrismaUserRepository();
  const useCase = new FindAllUsersUseCase(repo);

  const { total, users } = await useCase.execute(pagination ?? {});
  return res.json({ total, users });
}