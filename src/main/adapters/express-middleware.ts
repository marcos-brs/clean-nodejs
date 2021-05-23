import { Request, Response, NextFunction } from 'express';
import { HttpRequest, IMiddleware } from '../../presentation/protocols';

export const ExpressMiddlewareAdapter = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
    };
    const httpResponse = await middleware(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      next();
    }
  };
};
