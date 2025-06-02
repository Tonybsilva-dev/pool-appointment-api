import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: err.errors,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Unexpected error' });
}