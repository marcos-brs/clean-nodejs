import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  httpPort:
    (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 8080,
};

export const env = new EnvValidator(props);
