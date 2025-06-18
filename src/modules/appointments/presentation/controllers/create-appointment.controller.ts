import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment-repository';
import { PrismaSpaceRepository } from '@/modules/spaces/infra/repositories/prisma-space-repository';
import { PrismaUserRepository } from '@/modules/users/infra/repositories/prisma-user-repository';
import { CreateAppointmentUseCase } from '../../application/use-cases/create-appointment/create-appointment.use-case';
import { prisma } from '@/config/prisma';

export async function createAppointmentController(req: Request, res: Response) {
  const { userId, spaceId, date, startTime, endTime } = req.body;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const spaceRepo = new PrismaSpaceRepository();
  const userRepo = new PrismaUserRepository();
  const useCase = new CreateAppointmentUseCase(appointmentRepo, spaceRepo, userRepo);

  const appointment = await useCase.execute({
    userId,
    spaceId,
    date: new Date(date),
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  });

  return res.status(201).json(appointment);
} 