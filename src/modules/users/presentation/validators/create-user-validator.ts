import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED', 'PENDING'])
});

export const validateCreateUser = baseValidator(createUserSchema, 'body');