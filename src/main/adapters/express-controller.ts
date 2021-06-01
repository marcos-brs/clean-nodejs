import { NextFunction, Request, Response } from 'express';
import { HttpRequest, Controller } from '../../presentation/protocols';

export const ExpressControllerAdapter = (controller: Controller) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        user: req.user,
      };

      const httpResponse = await controller(httpRequest);
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
      } else {
        res.status(httpResponse.statusCode).json({
          code: httpResponse.body.code,
          message: httpResponse.body.message,
          details: httpResponse.body.details,
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
