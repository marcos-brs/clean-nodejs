import { Controller } from './controller';

export interface RouteConfig {
  method: string;
  path: string;
  func: Controller;
  middlewares: Function[];
}
