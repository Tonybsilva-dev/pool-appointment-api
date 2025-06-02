import bcrypt from 'bcryptjs';

export class Password {
  private constructor(private readonly hashedValue: string, private readonly isHashed: boolean) { }

  static async create(value: string, hashed: boolean = false): Promise<Password> {
    if (hashed) return new Password(value, true);

    const hash = await bcrypt.hash(value, 10);
    return new Password(hash, true);
  }

  get value(): string {
    return this.hashedValue;
  }

  async compare(raw: string): Promise<boolean> {
    return bcrypt.compare(raw, this.hashedValue);
  }
}