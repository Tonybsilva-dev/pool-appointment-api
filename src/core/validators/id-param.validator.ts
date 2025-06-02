import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const paramsIdSchema = z.object({
  id: z.string().uuid()
});

export function validateParamsId(req: Request, res: Response, next: NextFunction) {
  req.params = paramsIdSchema.parse(req.params);
  next();
}