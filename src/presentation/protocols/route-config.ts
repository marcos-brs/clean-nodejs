import { Controller } from './controller';
import { Middleware } from './middleware';

export interface RouteConfig {
  method: string;
  path: string;
  func: Controller;
  middlewares: Middleware[];
}
