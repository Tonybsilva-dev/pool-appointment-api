import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment-repository';
import { FindAppointmentByIdUseCase } from '../../application/use-cases/find-appointment/find-appointment-by-id.use-case';
import { prisma } from '@/config/prisma';

export async function findAppointmentByIdController(req: Request, res: Response) {
  const { id } = req.params;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new FindAppointmentByIdUseCase(appointmentRepo);

  const appointment = await useCase.execute(id);
  return res.status(200).json(appointment);
} 