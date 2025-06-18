import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment-repository';
import { DeleteAppointmentUseCase } from '../../application/use-cases/delete-appointment/delete-appointment.use-case';
import { prisma } from '@/config/prisma';

export async function deleteAppointmentController(req: Request, res: Response) {
  const { id } = req.params;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new DeleteAppointmentUseCase(appointmentRepo);

  await useCase.execute(id);
  return res.status(204).send();
} 