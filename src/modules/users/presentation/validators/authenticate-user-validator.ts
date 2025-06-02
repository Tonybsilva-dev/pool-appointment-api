import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function validateAuthenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = authenticateUserSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
}
