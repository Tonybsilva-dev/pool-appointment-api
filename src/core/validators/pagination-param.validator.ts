import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { baseValidator } from './base.validator';

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10),
  orderBy: z.string().optional(),
  orderDirection: z.enum(['asc', 'desc']).optional(),
});

export const validatePagination = baseValidator(paginationSchema, 'query', 'pagination');