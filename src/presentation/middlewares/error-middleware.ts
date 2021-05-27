import { Request, Response, NextFunction } from 'express';
import { logger } from '../../main/app/logger';
import { CodedError } from '../errors/code-error';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CodedError) {
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
