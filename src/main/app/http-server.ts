import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { container } from 'tsyringe';
import setupSwagger from '@/main/docs/swagger';
import { NotFoundError } from '@/presentation/errors';
import { HttpServerConfig } from '@/infra/http/protocols';
import { BaseController } from '@/presentation/protocols';
import { AccountController } from '@/presentation/controllers/account';
import { AuthController } from '@/presentation/controllers/auth';
import { RoleController } from '@/presentation/controllers/role';
import { Encrypter } from '@/infra/cryptography/protocols';
import { addTokenToRequest } from '@/presentation/middlewares';
import {
  ExpressControllerAdapter,
  ExpressMiddlewareAdapter,
} from '@/presentation/adapters';
import { errorHandler } from './error-handler';

export class HttpServer {
  protected app?: express.Application;

  protected config: HttpServerConfig;

  constructor(config: HttpServerConfig) {
    this.config = config;
  }

  get port(): number {
    return this.config.port;
  }

  getApp(): express.Application {
    if (!this.app) {
      throw new Error('Http server not started');
    }
    return this.app;
  }

  protected loadControllers(): BaseController[] {
    return [
      container.resolve(AccountController),
      container.resolve(AuthController),
      container.resolve(RoleController),
    ];
  }

  start(): void {
    if (this.app) {
      return;
    }

    /* Express initialization */
    const app = express();

    /* Express utilites */
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const router = express.Router();

    /* Status endpoint */
    router.get(
      ['/info', '/status'],
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }
    );

    this.loadControllers().forEach(controller => {
      if (!controller.routeConfigs) {
        return;
      }

      controller.routeConfigs.forEach(routeConfig => {
        const fullPath = [controller.path, routeConfig.path].join('');
        const jobs = [
          ...routeConfig.middlewares.map(middleware =>
            ExpressMiddlewareAdapter(middleware)
          ),
          ExpressControllerAdapter(routeConfig.func.bind(controller)),
        ];

        switch (routeConfig.method) {
          case 'get':
            router.get(fullPath, jobs);
            break;
          case 'post':
            router.post(fullPath, jobs);
            break;
          case 'put':
            router.put(fullPath, jobs);
            break;
          case 'patch':
            router.patch(fullPath, jobs);
            break;
          case 'delete':
            router.delete(fullPath, jobs);
            break;
          default:
            break;
        }
      });
    });

    const encrypter = container.resolve<Encrypter>('Encrypter');

    setupSwagger(app);

    app.use(ExpressMiddlewareAdapter(addTokenToRequest(encrypter)));
    app.use('/zero-api/v1', router);

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new NotFoundError());
      }
    );

    app.use(errorHandler);
    app.listen(this.config.port);

    this.app = app;
  }
}
