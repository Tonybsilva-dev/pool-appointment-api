import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { UserRepository } from '@/modules/users/domain/repositories/user-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface CreateAppointmentDTO {
  userId: string;
  spaceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new ResourceNotFoundError('User');
    }

    const space = await this.spaceRepository.findById(data.spaceId);
    if (!space) {
      throw new ResourceNotFoundError('Space');
    }

    const appointment = Appointment.create({
      userId: data.userId,
      spaceId: data.spaceId,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    await this.appointmentRepository.create(appointment);
    return appointment;
  }
} 