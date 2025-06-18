import { describe, it, expect, beforeEach } from 'vitest';
import { FindAppointmentsBySpaceIdUseCase } from './find-appointments-by-space-id.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { makeAppointment } from 'test/factories/make-appointment';
import { AppointmentStatus } from '@prisma/client';

describe('FindAppointmentsBySpaceIdUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let findAppointmentsBySpaceIdUseCase: FindAppointmentsBySpaceIdUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    findAppointmentsBySpaceIdUseCase = new FindAppointmentsBySpaceIdUseCase(appointmentRepository);
  });

  it('should return paginated appointments with total', async () => {
    const spaceId = 'space-123';

    await appointmentRepository.create(makeAppointment({ spaceId }));
    await appointmentRepository.create(makeAppointment({ spaceId }));
    await appointmentRepository.create(makeAppointment({ spaceId: 'other-space' }));

    const result = await findAppointmentsBySpaceIdUseCase.execute(spaceId, { page: 1, perPage: 10 });

    expect(result.total).toBe(2);
    expect(result.appointments).toHaveLength(2);
    expect(result.appointments[0].spaceId).toBe(spaceId);
    expect(result.appointments[1].spaceId).toBe(spaceId);
  });

  it('should return empty list when no appointments exist for space', async () => {
    const result = await findAppointmentsBySpaceIdUseCase.execute('space-123', { page: 1, perPage: 10 });

    expect(result.total).toBe(0);
    expect(result.appointments).toHaveLength(0);
  });

  it('should return correct page of appointments', async () => {
    const spaceId = 'space-123';

    for (let i = 0; i < 5; i++) {
      const startTime = new Date();
      startTime.setDate(startTime.getDate() + 1);
      startTime.setHours(9 + i * 3, 0, 0, 0); // 3 horas de intervalo
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 2, 0, 0, 0); // 2 horas de duração

      await appointmentRepository.create(makeAppointment({ spaceId, startTime, endTime }));
    }

    const result = await findAppointmentsBySpaceIdUseCase.execute(spaceId, { page: 2, perPage: 2 });

    expect(result.total).toBe(5);
    expect(result.appointments).toHaveLength(2);
  });

  it('should return appointments with different statuses', async () => {
    const spaceId = 'space-123';

    await appointmentRepository.create(makeAppointment({ spaceId, status: AppointmentStatus.PENDING }));
    await appointmentRepository.create(makeAppointment({ spaceId, status: AppointmentStatus.CONFIRMED }));
    await appointmentRepository.create(makeAppointment({ spaceId, status: AppointmentStatus.CANCELLED }));

    const result = await findAppointmentsBySpaceIdUseCase.execute(spaceId, { page: 1, perPage: 10 });

    expect(result.total).toBe(3);
    expect(result.appointments).toHaveLength(3);

    const statuses = result.appointments.map(a => a.status);
    expect(statuses).toContain(AppointmentStatus.PENDING);
    expect(statuses).toContain(AppointmentStatus.CONFIRMED);
    expect(statuses).toContain(AppointmentStatus.CANCELLED);
  });

  it('should return last page correctly', async () => {
    const spaceId = 'space-123';

    for (let i = 0; i < 3; i++) {
      await appointmentRepository.create(makeAppointment({ spaceId }));
    }

    const result = await findAppointmentsBySpaceIdUseCase.execute(spaceId, { page: 2, perPage: 2 });

    expect(result.total).toBe(3);
    expect(result.appointments).toHaveLength(1);
  });

  it('should handle pagination with default values', async () => {
    const spaceId = 'space-123';

    await appointmentRepository.create(makeAppointment({ spaceId }));
    await appointmentRepository.create(makeAppointment({ spaceId }));

    const result = await findAppointmentsBySpaceIdUseCase.execute(spaceId, {});

    expect(result.total).toBe(2);
    expect(result.appointments).toHaveLength(2);
  });
}); 