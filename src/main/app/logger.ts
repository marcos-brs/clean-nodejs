import { init } from '@somosphi/logger';
import bformat from 'bunyan-format';
import * as dotenv from 'dotenv';

dotenv.config();

const formatOut = bformat({
  outputMode: process.env.LOGGER_BEAUTIFY ? 'short' : 'bunyan',
});
const { Logger, ExpressLogger, AxiosLogger } = init({
  PROJECT_NAME: 'tagma-food',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LOG_LEVEL: process.env.LOGGER_LEVEL || 'info',
  STREAMS: [
    {
      stream: formatOut,
    },
  ],
});

export const logger = Logger;
export const expressLogger = ExpressLogger;
export const axiosLogger = AxiosLogger;
