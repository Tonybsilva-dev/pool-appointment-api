import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']).optional(),
});

export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  try {
    updateUserSchema.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ error: 'Validation failed', details: error });
  }
}