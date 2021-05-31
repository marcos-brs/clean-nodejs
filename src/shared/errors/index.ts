import Joi from 'joi';
import { AppException } from './app-exception';

export class NotFound extends AppException {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 404, details);
  }
}

export class BadRequest extends AppException {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400, details);
  }
}

export class Unauthorized extends AppException {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 401, details);
  }
}

export class Forbidden extends AppException {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 403, details);
  }
}
