import { HttpResponse } from './http';
import { RouteConfig } from './route-config';

export interface Controller<T = any> {
  (request: T): Promise<HttpResponse>;
}

export abstract class BaseController {
  path?: string;

  routeConfigs?: RouteConfig[];
}
