import { HttpResponse } from '.';

export interface IMiddleware<T = any> {
  (httpRequest: T): Promise<HttpResponse>;
}
