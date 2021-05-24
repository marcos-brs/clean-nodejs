import { HttpResponse } from '.';

export interface Middleware<T = any> {
  (httpRequest: T): HttpResponse;
}
