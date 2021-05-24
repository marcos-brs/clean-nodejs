import bcrypt from 'bcrypt';
import { env } from '../../../main/env';
import { Hasher } from '../protocols';

export class BcryptAdapter implements Hasher {
  private readonly salt: number;

  constructor() {
    this.salt = env.cryptographySalt;
  }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
