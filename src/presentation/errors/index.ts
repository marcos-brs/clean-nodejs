import Joi from 'joi';
import { BadRequest, NotFound } from '@/shared/errors';

export class NotFoundError extends NotFound {
  constructor() {
    super('NOT_FOUND', 'Page not found');
  }
}

export class ValidationError extends BadRequest {
  constructor(details: Joi.ValidationErrorItem[]) {
    super('VALIDATION_FAILED', 'Invalid request data', details);
  }
}
