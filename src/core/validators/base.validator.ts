import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

type Target = 'body' | 'query' | 'params';

export function baseValidator<T>(
  schema: ZodSchema<T>,
  target: Target,
  assignTo?: keyof Request
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[target]);
      if (assignTo) {
        (req as any)[assignTo] = data;
      } else {
        req[target] = data;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      next(error);
    }
  };
}