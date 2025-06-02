import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10),
  orderBy: z.string().optional(),
  orderDirection: z.enum(['asc', 'desc']).optional(),
});

export function validatePagination(req: Request, res: Response, next: NextFunction) {
  const result = paginationSchema.parse(req.query);
  req.pagination = result;
  next();
}