import Joi from 'joi';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export const validatorMiddleware =
  (schema: Joi.Schema): Middleware =>
  (httpRequest: HttpRequest): HttpResponse => {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {},
    };

    const validation = schema.validate(httpRequest, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      httpResponse.statusCode = 500;
      httpResponse.body = {
        message: validation.error.message,
        code: validation.error.message,
        details: validation.error.message,
      };
      return httpResponse;
    }

    Object.assign(httpRequest, validation.value);

    return httpResponse;
  };
