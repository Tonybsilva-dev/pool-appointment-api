import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';

export class FindAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findById(id);
  }
} 