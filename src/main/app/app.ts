import { validateOrReject, ValidationError } from 'class-validator';
import { HttpServer } from './http-server';
import { logger } from './logger';
import { env } from '../env';

export class Application {
  protected httpServer?: HttpServer;

  protected worker?: Worker;

  async start(): Promise<void> {
    try {
      await validateOrReject(env);

      this.httpServer = new HttpServer({
        port: env.httpPort,
      });
      this.httpServer.start();
      logger.info(`Http server started in port ${this.httpServer.port}`);
    } catch (err) {
      if (err.length && err[0] instanceof ValidationError) {
        this.throwEnvValidatorErrors(err);
      }
      throw err;
    }
  }

  private throwEnvValidatorErrors(err: ValidationError[]) {
    err.forEach((item: ValidationError) => {
      for (const key in item.constraints) {
        if (key) {
          const message = item.constraints[key];
          throw new Error(message);
        }
      }
    });
  }
}
