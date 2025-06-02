import { Booking } from "../entities/booking";

export interface BookingRepository {
  create(booking: Booking): Promise<void>;
  findOverlapping(spaceId: string, startTime: Date, endTime: Date): Promise<Booking[]>;
}