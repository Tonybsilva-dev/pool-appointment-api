import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED', 'PENDING'])
});

export function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = createUserSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
}
