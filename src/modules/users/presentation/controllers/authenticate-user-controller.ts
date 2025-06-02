import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user/authenticate-user-use-case';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import jwt from 'jsonwebtoken';

export async function authenticateUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const repo = new PrismaUserRepository();
    const useCase = new AuthenticateUserUseCase(repo);
    const user = await useCase.execute({ email, password });

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
