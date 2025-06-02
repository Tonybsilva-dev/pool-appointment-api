import { z } from 'zod';
import { baseValidator } from './base.validator';

const paramsIdSchema = z.object({
  id: z.string().uuid()
});

export const validateParamsId = baseValidator(paramsIdSchema, 'params');