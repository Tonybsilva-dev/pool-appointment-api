import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const updateSpaceSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  photos: z.array(z.string().url()).optional(),
  rules: z.string().optional(),
})

export function validateUpdateSpace(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = updateSpaceSchema.parse(req.body)
    next()
  } catch (error) {
    return res.status(400).json({ error: 'Validation failed', details: error })
  }
}