import { Application } from './main/app';
import { logger } from './main/app/logger';

const application = new Application();

setImmediate(async () => {
  await application.start();
  logger.info('Application started');
});
