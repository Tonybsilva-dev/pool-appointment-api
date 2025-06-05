import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface RatingProps {
  spaceId: string;
  userId: string;
  score: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Rating extends Entity<RatingProps> {
  get spaceId(): string {
    return this.props.spaceId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get score(): number {
    return this.props.score;
  }

  get comment(): string | undefined {
    return this.props.comment;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateScore(score: number): void {
    if (score < 1 || score > 5) {
      throw new Error('Score must be between 1 and 5');
    }
    this.props.score = score;
    this.props.updatedAt = new Date();
  }

  updateComment(comment: string): void {
    this.props.comment = comment;
    this.props.updatedAt = new Date();
  }

  static create(props: Omit<RatingProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Rating {
    if (props.score < 1 || props.score > 5) {
      throw new Error('Score must be between 1 and 5');
    }

    return new Rating(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );
  }
} 