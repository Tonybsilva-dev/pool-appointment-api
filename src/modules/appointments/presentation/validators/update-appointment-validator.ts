import { baseValidator } from '@/core/validators';
import { z } from 'zod';
import { AppointmentStatus } from '@prisma/client';

const updateAppointmentSchema = z.object({
  date: z.string().datetime().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  status: z.nativeEnum(AppointmentStatus).optional(),
});

export const validateUpdateAppointment = baseValidator(updateAppointmentSchema, 'body'); 