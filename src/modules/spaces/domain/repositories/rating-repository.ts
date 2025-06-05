import { Rating } from "../entities/rating";
import { PaginationParams } from "@/core/repositories/pagination-params";

export interface RatingRepository {
  create(rating: Rating): Promise<void>;
  findById(id: string): Promise<Rating | null>;
  findBySpaceId(spaceId: string, params: PaginationParams): Promise<{ total: number; ratings: Rating[] }>;
  findByUserId(userId: string, params: PaginationParams): Promise<{ total: number; ratings: Rating[] }>;
  update(rating: Rating): Promise<void>;
  delete(id: string): Promise<void>;
  countBySpaceId(spaceId: string): Promise<number>;
  getAverageScoreBySpaceId(spaceId: string): Promise<number>;
} 