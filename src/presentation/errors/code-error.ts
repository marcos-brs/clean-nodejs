export abstract class CodedError extends Error {
  code: string;

  statusCode: number;

  details?: Record<string, any>;

  constructor(
    code: string,
    message: string,
    statusCode: number,
    details?: Record<string, any>
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this);
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}
