import { Appointment } from '@/modules/appointments/domain/entities/appointment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AppointmentStatus } from '@prisma/client';

interface MakeAppointmentProps {
  id?: string;
  userId?: string;
  spaceId?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  status?: AppointmentStatus;
}

let appointmentCounter = 0;

export function makeAppointment(overrides: MakeAppointmentProps = {}): Appointment {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  appointmentCounter++;

  // Use o spaceId (ou um valor default) para garantir unicidade por espaço
  const spaceKey = overrides.spaceId ? parseInt(overrides.spaceId.replace(/\D/g, ''), 10) || 0 : appointmentCounter;
  const baseHour = 9 + ((appointmentCounter + spaceKey * 5) * 3) % 12; // espaçamento maior
  const baseMinute = ((appointmentCounter + spaceKey * 7) * 15) % 60;

  const startTime = new Date(tomorrow);
  startTime.setHours(baseHour, baseMinute, 0, 0);

  const endTime = new Date(tomorrow);
  endTime.setHours(baseHour + 2, baseMinute, 0, 0);

  const {
    id = new UniqueEntityID().toString(),
    userId = 'user-123',
    spaceId = `space-${appointmentCounter}`,
    date = tomorrow,
    startTime: customStartTime = startTime,
    endTime: customEndTime = endTime,
    status = 'PENDING',
  } = overrides;

  return Appointment.create(
    {
      userId,
      spaceId,
      date,
      startTime: customStartTime,
      endTime: customEndTime,
      status,
    },
    new UniqueEntityID(id),
  );
} 