import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment-repository';
import { FindAppointmentsBySpaceIdUseCase } from '../../application/use-cases/find-appointment/find-appointments-by-space-id.use-case';
import { prisma } from '@/config/prisma';

export async function findAppointmentsBySpaceIdController(req: Request, res: Response) {
  const { spaceId } = req.params;
  const pagination = req.pagination;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new FindAppointmentsBySpaceIdUseCase(appointmentRepo);

  const result = await useCase.execute(spaceId, pagination ?? {});

  return res.status(200).json(result);
} 