import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { TesteController } from '../../presentation/controllers/teste-controller';
import { BaseController, HttpServerConfig } from '../../presentation/protocols';
import {
  ExpressControllerAdapter,
  ExpressMiddlewareAdapter,
} from '../adapters';
import { expressLogger } from './logger';

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
    return [new TesteController()];
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
          ExpressControllerAdapter(routeConfig.func).bind(controller),
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

    app.use(expressLogger.onError.bind(expressLogger));
    app.use(expressLogger.onSuccess.bind(expressLogger));
    app.use('/zero-api/v1', router);

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new Error('Not Found'));
      }
    );

    app.listen(this.config.port);

    this.app = app;
  }
}
