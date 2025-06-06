import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export type RatingProps = {
  spaceId: string;
  userId: string;
  score: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Rating extends Entity<RatingProps> {
  get spaceId() {
    return this.props.spaceId;
  }

  get userId() {
    return this.props.userId;
  }

  get score() {
    return this.props.score;
  }

  get comment() {
    return this.props.comment;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  updateScore(score: number) {
    if (score < 1 || score > 5) {
      throw new Error('Score must be between 1 and 5');
    }
    this.props.score = score;
    this.touch();
  }

  updateComment(comment: string) {
    this.props.comment = comment;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<RatingProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    if (props.score < 1 || props.score > 5) {
      throw new Error('Score must be between 1 and 5');
    }

    const rating = new Rating(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return rating;
  }
} 