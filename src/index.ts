import { Application } from './main/app';

const application = new Application();

setImmediate(async () => {
  await application.start();
});
