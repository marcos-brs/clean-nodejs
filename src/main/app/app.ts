import { validateOrReject, ValidationError } from 'class-validator';
import { HttpServer } from './http-server';
import { env } from '../env';
import { MongoDB } from './mongodb';

export class Application {
  protected httpServer?: HttpServer;

  protected mongoDB?: MongoDB;

  protected worker?: Worker;

  async start(): Promise<void> {
    try {
      await validateOrReject(env);

      this.mongoDB = new MongoDB(
        env.mongoHost,
        env.mongoPort,
        env.mongoDatabase
      );
      this.mongoDB.connect();
      console.log(`MongoDB connected in port ${env.mongoPort}`);

      this.httpServer = new HttpServer({
        port: env.httpPort,
      });
      this.httpServer.start();
      console.log(`Http server started in port ${this.httpServer.port}`);
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
