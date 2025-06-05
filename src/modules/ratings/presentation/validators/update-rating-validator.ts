import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const updateRatingSchema = z.object({
  score: z.number().min(1).max(5).optional(),
  comment: z.string().optional(),
});

export function validateUpdateRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = updateRatingSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  return next();
} 