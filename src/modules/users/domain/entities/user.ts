import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { UserStatus } from "@prisma/client";
import { Password } from "./value-objects/password";

export type UserProps = {
  name: string;
  email: string;
  password: Password;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  updateName(name: string) {
    this.props.name = name;
    this.touch();
  }

  updateEmail(email: string) {
    this.props.email = email;
    this.touch();
  }

  updateStatus(status: UserStatus) {
    this.props.status = status;
    this.touch();
  }

  delete() {
    this.props.deletedAt = new Date();
    this.touch();
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
