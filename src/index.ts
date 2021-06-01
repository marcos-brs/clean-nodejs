import 'reflect-metadata';
import 'module-alias/register';
import { Application } from './main/app';
import { logger } from './main/app/logger';
import './shared/container';

const application = new Application();

setImmediate(async () => {
  await application.start();
  logger.info('Application started');
});
