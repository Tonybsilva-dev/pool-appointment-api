import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AppointmentStatus } from '@prisma/client';

export interface AppointmentProps {
  userId: string;
  spaceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Appointment extends Entity<AppointmentProps> {
  get userId(): string {
    return this.props.userId;
  }

  get spaceId(): string {
    return this.props.spaceId;
  }

  get date(): Date {
    return this.props.date;
  }

  get startTime(): Date {
    return this.props.startTime;
  }

  get endTime(): Date {
    return this.props.endTime;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  updateStatus(status: AppointmentStatus): void {
    this.props.status = status;
    this.touch();
  }

  updateDateTime(date: Date, startTime: Date, endTime: Date): void {
    const now = new Date();
    if (date < now) {
      throw new Error('Não é possível agendar para datas passadas');
    }

    if (startTime >= endTime) {
      throw new Error('O horário de início deve ser menor que o horário de fim');
    }

    this.props.date = date;
    this.props.startTime = startTime;
    this.props.endTime = endTime;
    this.touch();
  }

  static create(
    props: Optional<AppointmentProps, 'createdAt' | 'updatedAt' | 'status'>,
    id?: UniqueEntityID,
  ): Appointment {
    const now = new Date();
    if (props.date < now) {
      throw new Error('Não é possível agendar para datas passadas');
    }

    if (props.startTime >= props.endTime) {
      throw new Error('O horário de início deve ser menor que o horário de fim');
    }

    const appointment = new Appointment(
      {
        ...props,
        status: props.status ?? 'PENDING',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return appointment;
  }
} 