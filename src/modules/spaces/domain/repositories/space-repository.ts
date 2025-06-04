import { PaginationParams } from '@/core/repositories/pagination-params';
import { Space } from '../entities/space';

export interface SpaceRepository {
  create(space: Space): Promise<void>;
  findById(id: string): Promise<Space | null>;
  findAll(params: PaginationParams): Promise<{ total: number, spaces: Space[] }>;
  update(space: Space): Promise<void>;
  delete(id: string): Promise<void>;
}