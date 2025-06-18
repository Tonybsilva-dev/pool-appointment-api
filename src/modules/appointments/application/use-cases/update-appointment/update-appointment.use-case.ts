import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { AppointmentStatus } from '@prisma/client';

interface UpdateAppointmentDTO {
  id: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  status?: AppointmentStatus;
}

export class UpdateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute(data: UpdateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(data.id);

    if (!appointment) {
      throw new ResourceNotFoundError('Appointment');
    }

    if (data.status) {
      appointment.updateStatus(data.status);
    }

    if (data.date && data.startTime && data.endTime) {
      appointment.updateDateTime(data.date, data.startTime, data.endTime);
    }

    await this.appointmentRepository.update(appointment);
    return appointment;
  }
} 