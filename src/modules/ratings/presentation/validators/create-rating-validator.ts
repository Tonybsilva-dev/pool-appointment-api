import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createRatingSchema = z.object({
  spaceId: z.string().uuid(),
  userId: z.string().uuid(),
  score: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export function validateCreateRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = createRatingSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  return next();
} 