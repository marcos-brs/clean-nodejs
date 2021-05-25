import jwt from 'jsonwebtoken';
import { env } from '../../../main/env';
import { Encrypter } from '../protocols';

export class JwtAdapter implements Encrypter {
  async encrypt(data: any): Promise<string> {
    return jwt.sign(data, env.jwtSecret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, env.jwtSecret) as any;
  }
}
