import { Request, Response, NextFunction } from 'express';
import { HttpRequest, Middleware } from '../../presentation/protocols';

export const ExpressMiddlewareAdapter = (middleware: Middleware) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      user: req.user,
    };
    const httpResponse = await middleware(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.body.authUser) req.user = httpResponse.body.authUser;
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body,
      });
    }
  };
};
