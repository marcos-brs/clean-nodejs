import { NextFunction, Request, Response } from 'express';
import { HttpRequest, Controller } from '../../presentation/protocols';

export const ExpressControllerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      };

      const httpResponse = await controller(httpRequest);
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message,
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
