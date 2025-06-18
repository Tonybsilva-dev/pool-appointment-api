import { PrismaClient, AppointmentStatus } from '@prisma/client';
import { AppointmentRepository } from '../../domain/repositories/appointment-repository';
import { Appointment } from '../../domain/entities/appointment';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaClient) { }

  async create(appointment: Appointment): Promise<void> {
    // Verificar conflitos antes de criar o agendamento
    const conflictingAppointments = await this.findByDateRange(
      appointment.spaceId,
      appointment.startTime,
      appointment.endTime
    );

    if (conflictingAppointments.length > 0) {
      throw new Error('Já existe um agendamento para este horário neste espaço');
    }

    await this.prisma.appointment.create({
      data: {
        id: appointment.id.toString(),
        userId: appointment.userId,
        spaceId: appointment.spaceId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return null;
    }

    return Appointment.create(
      {
        userId: appointment.userId,
        spaceId: appointment.spaceId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
      new UniqueEntityID(appointment.id),
    );
  }

  async findByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const skip = ((params.page ?? 1) - 1) * (params.perPage ?? 10);

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { userId },
        skip,
        take: params.perPage ?? 10,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.appointment.count({
        where: { userId },
      }),
    ]);

    return {
      total,
      appointments: appointments.map(
        (appointment) =>
          Appointment.create(
            {
              userId: appointment.userId,
              spaceId: appointment.spaceId,
              date: appointment.date,
              startTime: appointment.startTime,
              endTime: appointment.endTime,
              status: appointment.status,
              createdAt: appointment.createdAt,
              updatedAt: appointment.updatedAt,
            },
            new UniqueEntityID(appointment.id),
          ),
      ),
    };
  }

  async findBySpaceId(
    spaceId: string,
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const skip = ((params.page ?? 1) - 1) * (params.perPage ?? 10);

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { spaceId },
        skip,
        take: params.perPage ?? 10,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.appointment.count({
        where: { spaceId },
      }),
    ]);

    return {
      total,
      appointments: appointments.map(
        (appointment) =>
          Appointment.create(
            {
              userId: appointment.userId,
              spaceId: appointment.spaceId,
              date: appointment.date,
              startTime: appointment.startTime,
              endTime: appointment.endTime,
              status: appointment.status,
              createdAt: appointment.createdAt,
              updatedAt: appointment.updatedAt,
            },
            new UniqueEntityID(appointment.id),
          ),
      ),
    };
  }

  async findByDateRange(
    spaceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        spaceId,
        AND: [
          {
            OR: [
              {
                startTime: {
                  gte: startDate,
                  lt: endDate,
                },
              },
              {
                endTime: {
                  gt: startDate,
                  lte: endDate,
                },
              },
              {
                AND: [
                  { startTime: { lte: startDate } },
                  { endTime: { gte: endDate } },
                ],
              },
            ],
          },
          {
            status: {
              not: AppointmentStatus.CANCELLED,
            },
          },
        ],
      },
    });

    return appointments.map(
      (appointment) =>
        Appointment.create(
          {
            userId: appointment.userId,
            spaceId: appointment.spaceId,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
          },
          new UniqueEntityID(appointment.id),
        ),
    );
  }

  async update(appointment: Appointment): Promise<void> {
    await this.prisma.appointment.update({
      where: { id: appointment.id.toString() },
      data: {
        userId: appointment.userId,
        spaceId: appointment.spaceId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        updatedAt: appointment.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.appointment.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return await this.prisma.appointment.count();
  }
} 