import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

export class FindAppointmentsBySpaceIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute(spaceId: string, params: PaginationParams) {
    return await this.appointmentRepository.findBySpaceId(spaceId, params);
  }
} 