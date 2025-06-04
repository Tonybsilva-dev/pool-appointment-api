import { describe, it, expect } from 'vitest';
import { User } from '@/modules/users/domain/entities/user';
import { Password } from '@/modules/users/domain/entities/value-objects/password';
import { UserStatus, UserRole } from '@prisma/client';
import { makeUser } from 'test/factories/make-user';

describe('User Entity', () => {
  it('should create a user', async () => {
    const user = await makeUser();

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.status).toBe('ACTIVE');
    expect(user.role).toBe('USER');
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should update user name', async () => {
    const user = await makeUser();
    const newName = 'Jane Doe';

    user.updateName(newName);

    expect(user.name).toBe(newName);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should update user email', async () => {
    const user = await makeUser();
    const newEmail = 'jane.doe@example.com';

    user.updateEmail(newEmail);

    expect(user.email).toBe(newEmail);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should update user status', async () => {
    const user = await makeUser();
    const newStatus: UserStatus = 'INACTIVE';

    user.updateStatus(newStatus);

    expect(user.status).toBe(newStatus);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should update user role', async () => {
    const user = await makeUser();
    const newRole: UserRole = 'ADMIN';

    user.updateRole(newRole);

    expect(user.role).toBe(newRole);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should delete user', async () => {
    const user = await makeUser();

    user.delete();

    expect(user.deletedAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should create user with custom props', async () => {
    const customProps = {
      name: 'Custom Name',
      email: 'custom@email.com',
      status: 'INACTIVE' as UserStatus,
      role: 'ADMIN' as UserRole,
    };

    const user = await makeUser(customProps);

    expect(user.name).toBe(customProps.name);
    expect(user.email).toBe(customProps.email);
    expect(user.status).toBe(customProps.status);
    expect(user.role).toBe(customProps.role);
  });
}); 