import { CodedError } from '../errors/code-error';
import { HttpResponse } from '../protocols';

export const badRequest = (error: CodedError): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: CodedError): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const unauthorized = (error: CodedError): HttpResponse => ({
  statusCode: 401,
  body: error,
});

export const serverAppException = (error: CodedError): HttpResponse => ({
  statusCode: 500,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
