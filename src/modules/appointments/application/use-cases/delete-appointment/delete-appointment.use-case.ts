import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

export class DeleteAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new ResourceNotFoundError('Appointment');
    }

    await this.appointmentRepository.delete(id);
  }
} 