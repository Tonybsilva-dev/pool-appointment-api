import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateAppointmentUseCase } from './update-appointment.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { makeAppointment } from 'test/factories/make-appointment';
import { AppointmentStatus } from '@prisma/client';

describe('UpdateAppointmentUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let updateAppointmentUseCase: UpdateAppointmentUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    updateAppointmentUseCase = new UpdateAppointmentUseCase(appointmentRepository);
  });

  it('should update appointment status', async () => {
    const appointment = makeAppointment({ status: AppointmentStatus.PENDING });
    await appointmentRepository.create(appointment);

    const updatedAppointment = await updateAppointmentUseCase.execute({
      id: appointment.id.toString(),
      status: AppointmentStatus.CONFIRMED,
    });

    expect(updatedAppointment.status).toBe(AppointmentStatus.CONFIRMED);
    expect(updatedAppointment.updatedAt).toBeInstanceOf(Date);
  });

  it('should update appointment date and time', async () => {
    const appointment = makeAppointment();
    await appointmentRepository.create(appointment);

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 2);

    const newStartTime = new Date(newDate);
    newStartTime.setHours(14, 0, 0, 0);

    const newEndTime = new Date(newDate);
    newEndTime.setHours(16, 0, 0, 0);

    const updatedAppointment = await updateAppointmentUseCase.execute({
      id: appointment.id.toString(),
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
    });

    expect(updatedAppointment.date).toEqual(newDate);
    expect(updatedAppointment.startTime).toEqual(newStartTime);
    expect(updatedAppointment.endTime).toEqual(newEndTime);
    expect(updatedAppointment.updatedAt).toBeInstanceOf(Date);
  });

  it('should update multiple fields at once', async () => {
    const appointment = makeAppointment({ status: AppointmentStatus.PENDING });
    await appointmentRepository.create(appointment);

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 2);

    const newStartTime = new Date(newDate);
    newStartTime.setHours(14, 0, 0, 0);

    const newEndTime = new Date(newDate);
    newEndTime.setHours(16, 0, 0, 0);

    const updatedAppointment = await updateAppointmentUseCase.execute({
      id: appointment.id.toString(),
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      status: AppointmentStatus.CONFIRMED,
    });

    expect(updatedAppointment.date).toEqual(newDate);
    expect(updatedAppointment.startTime).toEqual(newStartTime);
    expect(updatedAppointment.endTime).toEqual(newEndTime);
    expect(updatedAppointment.status).toBe(AppointmentStatus.CONFIRMED);
    expect(updatedAppointment.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw error when appointment not found', async () => {
    await expect(() =>
      updateAppointmentUseCase.execute({
        id: 'non-existent-id',
        status: AppointmentStatus.CONFIRMED,
      }),
    ).rejects.toThrow('Appointment not found');
  });

  it('should throw error if new date is in the past', async () => {
    const appointment = makeAppointment();
    await appointmentRepository.create(appointment);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startTime = new Date(yesterday);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(yesterday);
    endTime.setHours(12, 0, 0, 0);

    await expect(() =>
      updateAppointmentUseCase.execute({
        id: appointment.id.toString(),
        date: yesterday,
        startTime,
        endTime,
      }),
    ).rejects.toThrow('Não é possível agendar para datas passadas');
  });

  it('should throw error if start time is greater than or equal to end time', async () => {
    const appointment = makeAppointment();
    await appointmentRepository.create(appointment);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(12, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(10, 0, 0, 0);

    await expect(() =>
      updateAppointmentUseCase.execute({
        id: appointment.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
    ).rejects.toThrow('O horário de início deve ser menor que o horário de fim');
  });

  it('should maintain unchanged fields when only status is updated', async () => {
    const originalDate = new Date();
    originalDate.setDate(originalDate.getDate() + 1);

    const originalStartTime = new Date(originalDate);
    originalStartTime.setHours(10, 0, 0, 0);

    const originalEndTime = new Date(originalDate);
    originalEndTime.setHours(12, 0, 0, 0);

    const appointment = makeAppointment({
      date: originalDate,
      startTime: originalStartTime,
      endTime: originalEndTime,
      status: AppointmentStatus.PENDING,
    });
    await appointmentRepository.create(appointment);

    const updatedAppointment = await updateAppointmentUseCase.execute({
      id: appointment.id.toString(),
      status: AppointmentStatus.CONFIRMED,
    });

    expect(updatedAppointment.date).toEqual(originalDate);
    expect(updatedAppointment.startTime).toEqual(originalStartTime);
    expect(updatedAppointment.endTime).toEqual(originalEndTime);
    expect(updatedAppointment.status).toBe(AppointmentStatus.CONFIRMED);
  });
}); 