import { describe, it, expect, beforeEach } from 'vitest';
import { CreateAppointmentUseCase } from './create-appointment.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { InMemoryUserRepository } from 'test/repositories/in-memory-users-repository';
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository';
import { makeUser } from 'test/factories/make-user';
import { makeSpace } from 'test/factories/make-space';
import { Appointment } from '@/modules/appointments/domain/entities/appointment';
import { AppointmentStatus } from '@prisma/client';

describe('CreateAppointmentUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let userRepository: InMemoryUserRepository;
  let spaceRepository: InMemorySpacesRepository;
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    userRepository = new InMemoryUserRepository();
    spaceRepository = new InMemorySpacesRepository();
    createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentRepository,
      spaceRepository,
      userRepository,
    );
  });

  it('should create a new appointment', async () => {
    const user = await makeUser();
    const space = makeSpace();

    await userRepository.create(user);
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    const appointment = await createAppointmentUseCase.execute({
      userId: user.id.toString(),
      spaceId: space.id.toString(),
      date: tomorrow,
      startTime,
      endTime,
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.userId).toBe(user.id.toString());
    expect(appointment.spaceId).toBe(space.id.toString());
    expect(appointment.status).toBe(AppointmentStatus.PENDING);
    expect(appointment.date).toEqual(tomorrow);
    expect(appointment.startTime).toEqual(startTime);
    expect(appointment.endTime).toEqual(endTime);

    const total = await appointmentRepository.count();
    expect(total).toBe(1);
  });

  it('should throw error if user does not exist', async () => {
    const space = makeSpace();
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    await expect(() =>
      createAppointmentUseCase.execute({
        userId: 'non-existent-user',
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
    ).rejects.toThrow('User not found');
  });

  it('should throw error if space does not exist', async () => {
    const user = await makeUser();
    await userRepository.create(user);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    await expect(() =>
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: 'non-existent-space',
        date: tomorrow,
        startTime,
        endTime,
      }),
    ).rejects.toThrow('Space not found');
  });

  it('should throw error if appointment date is in the past', async () => {
    const user = await makeUser();
    const space = makeSpace();

    await userRepository.create(user);
    await spaceRepository.create(space);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startTime = new Date(yesterday);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(yesterday);
    endTime.setHours(12, 0, 0, 0);

    await expect(() =>
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space.id.toString(),
        date: yesterday,
        startTime,
        endTime,
      }),
    ).rejects.toThrow('Não é possível agendar para datas passadas');
  });

  it('should throw error if start time is greater than or equal to end time', async () => {
    const user = await makeUser();
    const space = makeSpace();

    await userRepository.create(user);
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(12, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(10, 0, 0, 0);

    await expect(() =>
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
    ).rejects.toThrow('O horário de início deve ser menor que o horário de fim');
  });

  it('should throw error if there is a time conflict for the same space', async () => {
    const user = await makeUser();
    const space = makeSpace();

    await userRepository.create(user);
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime1 = new Date(tomorrow);
    startTime1.setHours(10, 0, 0, 0);

    const endTime1 = new Date(tomorrow);
    endTime1.setHours(12, 0, 0, 0);

    await createAppointmentUseCase.execute({
      userId: user.id.toString(),
      spaceId: space.id.toString(),
      date: tomorrow,
      startTime: startTime1,
      endTime: endTime1,
    });

    const startTime2 = new Date(tomorrow);
    startTime2.setHours(11, 0, 0, 0);

    const endTime2 = new Date(tomorrow);
    endTime2.setHours(13, 0, 0, 0);

    await expect(() =>
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime: startTime2,
        endTime: endTime2,
      }),
    ).rejects.toThrow('Já existe um agendamento para este horário neste espaço');
  });

  it('should allow appointments for different spaces at the same time', async () => {
    const user = await makeUser();
    const space1 = makeSpace({ id: 'space-1' });
    const space2 = makeSpace({ id: 'space-2' });

    await userRepository.create(user);
    await spaceRepository.create(space1);
    await spaceRepository.create(space2);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    await createAppointmentUseCase.execute({
      userId: user.id.toString(),
      spaceId: space1.id.toString(),
      date: tomorrow,
      startTime,
      endTime,
    });

    await createAppointmentUseCase.execute({
      userId: user.id.toString(),
      spaceId: space2.id.toString(),
      date: tomorrow,
      startTime,
      endTime,
    });

    const total = await appointmentRepository.count();
    expect(total).toBe(2);
  });
});

describe('CreateAppointmentUseCase Concurrency', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let userRepository: InMemoryUserRepository;
  let spaceRepository: InMemorySpacesRepository;
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    userRepository = new InMemoryUserRepository();
    spaceRepository = new InMemorySpacesRepository();
    createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentRepository,
      spaceRepository,
      userRepository,
    );
  });

  it('should handle concurrent appointments for different users in same space', async () => {
    const user1 = await makeUser({ id: 'user-1' });
    const user2 = await makeUser({ id: 'user-2' });
    const space = makeSpace();

    await userRepository.create(user1);
    await userRepository.create(user2);
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime1 = new Date(tomorrow);
    startTime1.setHours(10, 0, 0, 0);
    const endTime1 = new Date(tomorrow);
    endTime1.setHours(12, 0, 0, 0);

    const startTime2 = new Date(tomorrow);
    startTime2.setHours(14, 0, 0, 0);
    const endTime2 = new Date(tomorrow);
    endTime2.setHours(16, 0, 0, 0);

    const promises = [
      createAppointmentUseCase.execute({
        userId: user1.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime: startTime1,
        endTime: endTime1,
      }),
      createAppointmentUseCase.execute({
        userId: user2.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime: startTime2,
        endTime: endTime2,
      }),
    ];

    const results = await Promise.all(promises);

    expect(results).toHaveLength(2);
    expect(results[0]).toBeInstanceOf(Appointment);
    expect(results[1]).toBeInstanceOf(Appointment);
    expect(results[0].userId).toBe(user1.id.toString());
    expect(results[1].userId).toBe(user2.id.toString());

    const total = await appointmentRepository.count();
    expect(total).toBe(2);
  });

  it('should handle concurrent conflicting appointments', async () => {
    const user1 = await makeUser({ id: 'user-1' });
    const user2 = await makeUser({ id: 'user-2' });
    const space = makeSpace();

    await userRepository.create(user1);
    await userRepository.create(user2);
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);
    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    const promises = [
      createAppointmentUseCase.execute({
        userId: user1.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
      createAppointmentUseCase.execute({
        userId: user2.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
    ];

    const results = await Promise.allSettled(promises);

    expect(results[0].status).toBe('fulfilled');
    expect(results[1].status).toBe('rejected');

    if (results[1].status === 'rejected') {
      expect(results[1].reason.message).toBe('Já existe um agendamento para este horário neste espaço');
    }

    const total = await appointmentRepository.count();
    expect(total).toBe(1);
  });

  it('should handle concurrent appointments for different spaces', async () => {
    const user = await makeUser();
    const space1 = makeSpace({ id: 'space-1' });
    const space2 = makeSpace({ id: 'space-2' });
    const space3 = makeSpace({ id: 'space-3' });

    await userRepository.create(user);
    await spaceRepository.create(space1);
    await spaceRepository.create(space2);
    await spaceRepository.create(space3);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);
    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    const promises = [
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space1.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space2.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space3.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      }),
    ];

    const results = await Promise.all(promises);

    expect(results).toHaveLength(3);
    results.forEach(result => {
      expect(result).toBeInstanceOf(Appointment);
    });

    const total = await appointmentRepository.count();
    expect(total).toBe(3);
  });

  it('should handle race condition with multiple users trying to book same slot', async () => {
    const users = [];
    const space = makeSpace();

    for (let i = 0; i < 5; i++) {
      const user = await makeUser({ id: `user-${i}` });
      await userRepository.create(user);
      users.push(user);
    }
    await spaceRepository.create(space);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);
    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);

    const promises = users.map(user =>
      createAppointmentUseCase.execute({
        userId: user.id.toString(),
        spaceId: space.id.toString(),
        date: tomorrow,
        startTime,
        endTime,
      })
    );

    const results = await Promise.allSettled(promises);

    const successful = results.filter(result => result.status === 'fulfilled');
    const failed = results.filter(result => result.status === 'rejected');

    expect(successful).toHaveLength(1);
    expect(failed).toHaveLength(4);

    failed.forEach(result => {
      if (result.status === 'rejected') {
        expect(result.reason.message).toBe('Já existe um agendamento para este horário neste espaço');
      }
    });

    const total = await appointmentRepository.count();
    expect(total).toBe(1);
  });
}); 