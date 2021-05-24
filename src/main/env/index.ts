import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  httpPort:
    (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 8080,
  mongoHost: process.env.MONGO_HOST || '',
  mongoPort:
    (process.env.MONGO_PORT && parseInt(process.env.MONGO_PORT, 10)) || 8080,
  mongoDatabase: process.env.MONGO_DATABASE || '',
};

export const env = new EnvValidator(props);
