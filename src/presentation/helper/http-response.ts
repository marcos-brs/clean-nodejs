import { AppException } from '../../shared/errors/app-exception';
import { HttpResponse } from '../protocols';

export const badRequest = (error: AppException): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: AppException): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const unauthorized = (error: AppException): HttpResponse => ({
  statusCode: 401,
  body: error,
});

export const serverAppException = (error: AppException): HttpResponse => ({
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
