import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

export class FindAppointmentsByUserIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute(userId: string, params: PaginationParams) {
    return await this.appointmentRepository.findByUserId(userId, params);
  }
} 