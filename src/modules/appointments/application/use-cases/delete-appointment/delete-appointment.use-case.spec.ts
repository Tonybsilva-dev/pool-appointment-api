import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteAppointmentUseCase } from './delete-appointment.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { makeAppointment } from 'test/factories/make-appointment';
import { AppointmentStatus } from '@prisma/client';

describe('DeleteAppointmentUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let deleteAppointmentUseCase: DeleteAppointmentUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    deleteAppointmentUseCase = new DeleteAppointmentUseCase(appointmentRepository);
  });

  it('should delete an appointment', async () => {
    const appointment = makeAppointment();
    await appointmentRepository.create(appointment);

    await deleteAppointmentUseCase.execute(appointment.id.toString());

    const deletedAppointment = await appointmentRepository.findById(appointment.id.toString());
    expect(deletedAppointment).toBeNull();

    const total = await appointmentRepository.count();
    expect(total).toBe(0);
  });

  it('should throw error when appointment not found', async () => {
    await expect(() =>
      deleteAppointmentUseCase.execute('non-existent-id'),
    ).rejects.toThrow('Appointment not found');
  });

  it('should delete appointment with different statuses', async () => {
    const pendingAppointment = makeAppointment({ status: AppointmentStatus.PENDING });
    const confirmedAppointment = makeAppointment({ status: AppointmentStatus.CONFIRMED });
    const cancelledAppointment = makeAppointment({ status: AppointmentStatus.CANCELLED });

    await appointmentRepository.create(pendingAppointment);
    await appointmentRepository.create(confirmedAppointment);
    await appointmentRepository.create(cancelledAppointment);

    await deleteAppointmentUseCase.execute(pendingAppointment.id.toString());
    await deleteAppointmentUseCase.execute(confirmedAppointment.id.toString());
    await deleteAppointmentUseCase.execute(cancelledAppointment.id.toString());

    const total = await appointmentRepository.count();
    expect(total).toBe(0);
  });

  it('should delete multiple appointments', async () => {
    const appointment1 = makeAppointment();
    const appointment2 = makeAppointment();
    const appointment3 = makeAppointment();

    await appointmentRepository.create(appointment1);
    await appointmentRepository.create(appointment2);
    await appointmentRepository.create(appointment3);

    expect(await appointmentRepository.count()).toBe(3);

    await deleteAppointmentUseCase.execute(appointment1.id.toString());
    await deleteAppointmentUseCase.execute(appointment2.id.toString());

    expect(await appointmentRepository.count()).toBe(1);

    const remainingAppointment = await appointmentRepository.findById(appointment3.id.toString());
    expect(remainingAppointment).toBeDefined();
    expect(remainingAppointment?.id.toString()).toBe(appointment3.id.toString());
  });
}); 