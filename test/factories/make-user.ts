import { User } from '@/modules/users/domain/entities/user';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Password } from '@/modules/users/domain/entities/value-objects/password';
import { UserStatus, UserRole } from '@prisma/client';

interface MakeUserProps {
  id?: string;
  name?: string;
  email?: string;
  password?: Password;
  status?: UserStatus;
  role?: UserRole;
}

export async function makeUser(overrides: MakeUserProps = {}): Promise<User> {
  const {
    id = new UniqueEntityID().toString(),
    name = 'John Doe',
    email = 'john.doe@example.com',
    password = await Password.create('123456'),
    status = 'ACTIVE',
    role = 'USER',
  } = overrides;

  return User.create({
    name,
    email,
    password,
    status,
    role,
  }, new UniqueEntityID(id));
}
