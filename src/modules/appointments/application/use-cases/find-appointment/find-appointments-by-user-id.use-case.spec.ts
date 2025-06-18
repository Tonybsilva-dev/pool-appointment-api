import { describe, it, expect, beforeEach } from 'vitest';
import { FindAppointmentsByUserIdUseCase } from './find-appointments-by-user-id.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { makeAppointment } from 'test/factories/make-appointment';
import { AppointmentStatus } from '@prisma/client';

describe('FindAppointmentsByUserIdUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let findAppointmentsByUserIdUseCase: FindAppointmentsByUserIdUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    findAppointmentsByUserIdUseCase = new FindAppointmentsByUserIdUseCase(appointmentRepository);
  });

  it('should return paginated appointments with total', async () => {
    const userId = 'user-123';

    await appointmentRepository.create(makeAppointment({ userId }));
    await appointmentRepository.create(makeAppointment({ userId }));
    await appointmentRepository.create(makeAppointment({ userId: 'other-user' }));

    const result = await findAppointmentsByUserIdUseCase.execute(userId, { page: 1, perPage: 10 });

    expect(result.total).toBe(2);
    expect(result.appointments).toHaveLength(2);
    expect(result.appointments[0].userId).toBe(userId);
    expect(result.appointments[1].userId).toBe(userId);
  });

  it('should return empty list when no appointments exist for user', async () => {
    const result = await findAppointmentsByUserIdUseCase.execute('user-123', { page: 1, perPage: 10 });

    expect(result.total).toBe(0);
    expect(result.appointments).toHaveLength(0);
  });

  it('should return correct page of appointments', async () => {
    const userId = 'user-123';

    for (let i = 0; i < 5; i++) {
      await appointmentRepository.create(makeAppointment({ userId }));
    }

    const result = await findAppointmentsByUserIdUseCase.execute(userId, { page: 2, perPage: 2 });

    expect(result.total).toBe(5);
    expect(result.appointments).toHaveLength(2);
  });

  it('should return appointments with different statuses', async () => {
    const userId = 'user-123';

    await appointmentRepository.create(makeAppointment({ userId, status: AppointmentStatus.PENDING }));
    await appointmentRepository.create(makeAppointment({ userId, status: AppointmentStatus.CONFIRMED }));
    await appointmentRepository.create(makeAppointment({ userId, status: AppointmentStatus.CANCELLED }));

    const result = await findAppointmentsByUserIdUseCase.execute(userId, { page: 1, perPage: 10 });

    expect(result.total).toBe(3);
    expect(result.appointments).toHaveLength(3);

    const statuses = result.appointments.map(a => a.status);
    expect(statuses).toContain(AppointmentStatus.PENDING);
    expect(statuses).toContain(AppointmentStatus.CONFIRMED);
    expect(statuses).toContain(AppointmentStatus.CANCELLED);
  });

  it('should return last page correctly', async () => {
    const userId = 'user-123';

    for (let i = 0; i < 3; i++) {
      await appointmentRepository.create(makeAppointment({ userId }));
    }

    const result = await findAppointmentsByUserIdUseCase.execute(userId, { page: 2, perPage: 2 });

    expect(result.total).toBe(3);
    expect(result.appointments).toHaveLength(1);
  });

  it('should handle pagination with default values', async () => {
    const userId = 'user-123';

    await appointmentRepository.create(makeAppointment({ userId }));
    await appointmentRepository.create(makeAppointment({ userId }));

    const result = await findAppointmentsByUserIdUseCase.execute(userId, {});

    expect(result.total).toBe(2);
    expect(result.appointments).toHaveLength(2);
  });
}); 