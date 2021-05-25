import Joi from 'joi';
import { CodedError } from './code-error';

export class NotFound extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 404, details);
  }
}

export class BadRequest extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400, details);
  }
}

export class Unauthorized extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 401, details);
  }
}

export class Forbidden extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 403, details);
  }
}

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
