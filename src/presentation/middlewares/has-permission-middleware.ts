import { Unauthorized } from '../../shared/errors';
import { ok, unauthorized } from '../helper';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

const includesAllItems = (arr: string[], target: string[]): boolean => {
  return target.every(v => arr.includes(v));
};

export const hasPermission =
  (authRoles: string[]): Middleware =>
  async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const roles = httpRequest.user?.roles as string[];
      if (!includesAllItems(roles, authRoles))
        throw new Unauthorized('You have no permission', 'Unauthorized');

      return Promise.resolve(ok({}));
    } catch (error) {
      return unauthorized(error);
    }
  };
