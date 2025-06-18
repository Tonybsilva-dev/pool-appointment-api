import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment-repository';
import { UpdateAppointmentUseCase } from '../../application/use-cases/update-appointment/update-appointment.use-case';
import { prisma } from '@/config/prisma';

export async function updateAppointmentController(req: Request, res: Response) {
  const { id } = req.params;
  const { date, startTime, endTime, status } = req.body;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new UpdateAppointmentUseCase(appointmentRepo);

  const appointment = await useCase.execute({
    id,
    date: date ? new Date(date) : undefined,
    startTime: startTime ? new Date(startTime) : undefined,
    endTime: endTime ? new Date(endTime) : undefined,
    status,
  });

  return res.status(200).json(appointment);
} 