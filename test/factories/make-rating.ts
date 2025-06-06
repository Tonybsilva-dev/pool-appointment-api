import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Rating } from '@/modules/ratings/domain/entities/rating';

interface Override {
  id?: string;
  spaceId?: string;
  userId?: string;
  score?: number;
  comment?: string;
}

export function makeRating(override: Override = {}) {
  return Rating.create({
    spaceId: override.spaceId ?? 'space-123',
    userId: override.userId ?? 'user-123',
    score: override.score ?? 5,
    comment: override.comment ?? 'Ótimo espaço!',
  }, override.id ? new UniqueEntityID(override.id) : undefined);
} 