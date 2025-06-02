import { Booking, BookingStatus } from '../../domain/entities/booking';
import { BookingRepository } from '../../domain/repositories/booking-repository';
import { randomUUID } from 'crypto';

interface CreateBookingDTO {
  userId: string;
  spaceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}

export class CreateBookingUseCase {
  constructor(private readonly bookingRepository: BookingRepository) { }

  async execute(data: CreateBookingDTO): Promise<Booking> {
    const overlapping = await this.bookingRepository.findOverlapping(
      data.spaceId,
      data.startTime,
      data.endTime
    );

    if (overlapping.length > 0) {
      throw new Error('Time slot is already booked');
    }

    const booking = new Booking(
      randomUUID(),
      data.userId,
      data.spaceId,
      data.date,
      data.startTime,
      data.endTime
    );

    await this.bookingRepository.create(booking);
    return booking;
  }
}