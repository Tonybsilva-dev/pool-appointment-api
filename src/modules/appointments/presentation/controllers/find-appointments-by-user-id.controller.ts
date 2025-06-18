import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment-repository';
import { FindAppointmentsByUserIdUseCase } from '../../application/use-cases/find-appointment/find-appointments-by-user-id.use-case';
import { prisma } from '@/config/prisma';

export async function findAppointmentsByUserIdController(req: Request, res: Response) {
  const { userId } = req.params;
  const pagination = req.pagination;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new FindAppointmentsByUserIdUseCase(appointmentRepo);

  const result = await useCase.execute(userId, pagination ?? {});

  return res.status(200).json(result);
} 