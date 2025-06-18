import { PaginationParams } from '@/core/repositories/pagination-params';
import { Appointment } from '@/modules/appointments/domain/entities/appointment';
import { AppointmentRepository } from '@/modules/appointments/domain/repositories/appointment-repository';
import { AppointmentStatus } from '@prisma/client';

export class InMemoryAppointmentRepository implements AppointmentRepository {
  private appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    // Verificar conflitos antes de criar o agendamento
    // Usar uma verificação mais robusta que simule o comportamento de um banco de dados
    const conflictingAppointments = this.appointments.filter(existing => {
      if (existing.spaceId !== appointment.spaceId) return false;
      if (existing.status === AppointmentStatus.CANCELLED) return false;

      const existingStart = existing.startTime;
      const existingEnd = existing.endTime;
      const newStart = appointment.startTime;
      const newEnd = appointment.endTime;

      // Verificar sobreposição de horários
      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });

    if (conflictingAppointments.length > 0) {
      throw new Error('Já existe um agendamento para este horário neste espaço');
    }

    this.appointments.push(appointment);
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.appointments.find(a => a.id.toString() === id) || null;
  }

  async findByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const userAppointments = this.appointments.filter(a => a.userId === userId);
    const skip = ((params.page ?? 1) - 1) * (params.perPage ?? 10);
    const appointments = userAppointments.slice(skip, skip + (params.perPage ?? 10));

    return {
      total: userAppointments.length,
      appointments,
    };
  }

  async findBySpaceId(
    spaceId: string,
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const spaceAppointments = this.appointments.filter(a => a.spaceId === spaceId);
    const skip = ((params.page ?? 1) - 1) * (params.perPage ?? 10);
    const appointments = spaceAppointments.slice(skip, skip + (params.perPage ?? 10));

    return {
      total: spaceAppointments.length,
      appointments,
    };
  }

  async findByDateRange(
    spaceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    return this.appointments.filter(appointment => {
      if (appointment.spaceId !== spaceId) return false;
      if (appointment.status === AppointmentStatus.CANCELLED) return false;

      const appointmentStart = appointment.startTime;
      const appointmentEnd = appointment.endTime;

      return (
        (appointmentStart >= startDate && appointmentStart < endDate) ||
        (appointmentEnd > startDate && appointmentEnd <= endDate) ||
        (appointmentStart <= startDate && appointmentEnd >= endDate)
      );
    });
  }

  async update(appointment: Appointment): Promise<void> {
    const index = this.appointments.findIndex(a => a.id.toString() === appointment.id.toString());
    if (index >= 0) {
      this.appointments[index] = appointment;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.appointments.findIndex(a => a.id.toString() === id);
    if (index >= 0) {
      this.appointments.splice(index, 1);
    }
  }

  async count(): Promise<number> {
    return this.appointments.length;
  }
} 