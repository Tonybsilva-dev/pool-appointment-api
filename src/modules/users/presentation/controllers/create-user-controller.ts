import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';

export async function createUserController(req: Request, res: Response) {
  const { name, email, password, status } = req.body;
  const repo = new PrismaUserRepository();
  const useCase = new CreateUserUseCase(repo);

  const user = await useCase.execute({ name, email, password, status });
  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
}
