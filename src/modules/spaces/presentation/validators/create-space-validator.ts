import { baseValidator } from '@/core/validators'
import { z } from 'zod'

const createSpaceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  photos: z.array(z.string().url()),
  rules: z.string().min(5),
  hostId: z.string().uuid()
})

export const validateCreateSpace = baseValidator(createSpaceSchema, 'body')