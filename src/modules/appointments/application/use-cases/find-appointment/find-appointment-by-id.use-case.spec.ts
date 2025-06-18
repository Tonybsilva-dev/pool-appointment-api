import { describe, it, expect, beforeEach } from 'vitest';
import { FindAppointmentByIdUseCase } from './find-appointment-by-id.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { makeAppointment } from 'test/factories/make-appointment';
import { AppointmentStatus } from '@prisma/client';

describe('FindAppointmentByIdUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let findAppointmentByIdUseCase: FindAppointmentByIdUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    findAppointmentByIdUseCase = new FindAppointmentByIdUseCase(appointmentRepository);
  });

  it('should find appointment by ID', async () => {
    const appointment = makeAppointment();
    await appointmentRepository.create(appointment);

    const result = await findAppointmentByIdUseCase.execute(appointment.id.toString());

    expect(result).toBeDefined();
    expect(result?.id.toString()).toBe(appointment.id.toString());
    expect(result?.userId).toBe(appointment.userId);
    expect(result?.spaceId).toBe(appointment.spaceId);
    expect(result?.status).toBe(appointment.status);
    expect(result?.date).toEqual(appointment.date);
    expect(result?.startTime).toEqual(appointment.startTime);
    expect(result?.endTime).toEqual(appointment.endTime);
  });

  it('should return null when appointment not found', async () => {
    const result = await findAppointmentByIdUseCase.execute('non-existent-id');
    expect(result).toBeNull();
  });

  it('should find appointment with different statuses', async () => {
    const pendingAppointment = makeAppointment({ status: AppointmentStatus.PENDING });
    const confirmedAppointment = makeAppointment({ status: AppointmentStatus.CONFIRMED });
    const cancelledAppointment = makeAppointment({ status: AppointmentStatus.CANCELLED });

    await appointmentRepository.create(pendingAppointment);
    await appointmentRepository.create(confirmedAppointment);
    await appointmentRepository.create(cancelledAppointment);

    const pendingResult = await findAppointmentByIdUseCase.execute(pendingAppointment.id.toString());
    const confirmedResult = await findAppointmentByIdUseCase.execute(confirmedAppointment.id.toString());
    const cancelledResult = await findAppointmentByIdUseCase.execute(cancelledAppointment.id.toString());

    expect(pendingResult?.status).toBe(AppointmentStatus.PENDING);
    expect(confirmedResult?.status).toBe(AppointmentStatus.CONFIRMED);
    expect(cancelledResult?.status).toBe(AppointmentStatus.CANCELLED);
  });

  it('should find appointment with all fields', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    const appointment = makeAppointment({
      userId: 'user-123',
      spaceId: 'space-456',
      date: tomorrow,
      startTime,
      endTime,
      status: AppointmentStatus.CONFIRMED,
    });

    await appointmentRepository.create(appointment);

    const result = await findAppointmentByIdUseCase.execute(appointment.id.toString());

    expect(result).toBeDefined();
    expect(result?.userId).toBe('user-123');
    expect(result?.spaceId).toBe('space-456');
    expect(result?.date).toEqual(tomorrow);
    expect(result?.startTime).toEqual(startTime);
    expect(result?.endTime).toEqual(endTime);
    expect(result?.status).toBe(AppointmentStatus.CONFIRMED);
    expect(result?.createdAt).toBeInstanceOf(Date);
    expect(result?.updatedAt).toBeInstanceOf(Date);
  });
}); 