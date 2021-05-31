import { Request, Response, NextFunction } from 'express';
import { logger } from '../../main/app/logger';
import { AppException } from '../../shared/errors/app-exception';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppException) {
    logger.warn(err);

    const { statusCode, message, code, details } = err;
    res.status(statusCode).send({
      code,
      message,
      details,
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: 'Internal server failure',
  });

  return next();
};
