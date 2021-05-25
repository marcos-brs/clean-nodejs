import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  httpPort:
    (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 8080,
  cryptographySalt:
    (process.env.CRIPTOGRAPHY_SALT &&
      parseInt(process.env.CRIPTOGRAPHY_SALT, 2)) ||
    12,
  jwtSecret: process.env.JWT_SECRET || '',
  mongoHost: process.env.MONGO_HOST || '',
  mongoPort:
    (process.env.MONGO_PORT && parseInt(process.env.MONGO_PORT, 10)) || 27017,
  mongoDatabase: process.env.MONGO_DATABASE || '',
};

export const env = new EnvValidator(props);
