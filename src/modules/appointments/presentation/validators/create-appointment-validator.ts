import { baseValidator } from '@/core/validators';
import { z } from 'zod';

const createAppointmentSchema = z.object({
  userId: z.string().uuid(),
  spaceId: z.string().uuid(),
  date: z.string().datetime(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export const validateCreateAppointment = baseValidator(createAppointmentSchema, 'body'); 