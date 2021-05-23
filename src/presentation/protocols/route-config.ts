import { IController } from './controller';

export interface RouteConfig {
  method: string;
  path: string;
  func: IController;
  middlewares: Function[];
}
