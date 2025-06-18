import { PaginationParams } from '@/core/repositories/pagination-params';
import { Appointment } from '../entities/appointment';

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findByUserId(userId: string, params: PaginationParams): Promise<{ total: number; appointments: Appointment[] }>;
  findBySpaceId(spaceId: string, params: PaginationParams): Promise<{ total: number; appointments: Appointment[] }>;
  findByDateRange(spaceId: string, startDate: Date, endDate: Date): Promise<Appointment[]>;
  update(appointment: Appointment): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
} 