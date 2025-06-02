import { PaginationParams } from '@/core/repositories/pagination-params';

declare global {
  namespace Express {
    interface Request {
      pagination?: PaginationParams;
    }
  }
}