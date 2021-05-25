import Joi from 'joi';
import { ValidationError } from '../errors';
import { badRequest, ok } from '../helper';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export const validatorMiddleware =
  (schema: Joi.Schema): Middleware =>
  async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    const validation = schema.validate(httpRequest, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      return badRequest(new ValidationError(validation.error.details));
    }

    Object.assign(httpRequest, validation.value);

    return ok({});
  };
