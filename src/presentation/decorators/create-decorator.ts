import { HttpResponse, Middleware } from '../protocols';

export const createRouteDecorator = (method: string) =>
  function (path: string, middlewares: Middleware[] = []): Function {
    return function (target: any, propertyName: string) {
      if (!target.routeConfigs) {
        target.routeConfigs = [];
      }
      const func = target[propertyName];
      if (func instanceof Function) {
        target.routeConfigs.push({
          path,
          method,
          middlewares,
          func: target[propertyName],
        });
      }
    };
  };
