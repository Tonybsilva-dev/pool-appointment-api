import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SpaceProps {
  title: string
  description: string
  photos: string[]
  rules: string
  hostId: string
  createdAt: Date
  updatedAt: Date
  averageRating: number
}

export class Space extends Entity<SpaceProps> {
  get title() {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
    this.touch()
  }

  get photos() {
    return this.props.photos
  }

  set photos(value: string[]) {
    this.props.photos = value
    this.touch()
  }

  get rules() {
    return this.props.rules
  }

  set rules(value: string) {
    this.props.rules = value
    this.touch()
  }

  get hostId() {
    return this.props.hostId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get averageRating() {
    return this.props.averageRating
  }

  set averageRating(value: number) {
    this.props.averageRating = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<SpaceProps, 'createdAt' | 'updatedAt' | 'averageRating'>,
    id?: UniqueEntityID,
  ) {
    const space = new Space(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        averageRating: props.averageRating ?? 0,
      },
      id,
    )

    return space
  }
} 