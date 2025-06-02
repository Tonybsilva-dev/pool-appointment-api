export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class Booking {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly spaceId: string,
    public date: Date,
    public startTime: Date,
    public endTime: Date,
    public status: BookingStatus = BookingStatus.PENDING
  ) { }
}