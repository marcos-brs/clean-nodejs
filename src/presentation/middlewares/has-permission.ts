import { Unauthorized } from '../errors';
import { ok } from '../helper';
import { HttpRequest, HttpResponse } from '../protocols';

export default class HasPermission {
  private readonly authRoles: string[];

  constructor(authRoles: string[]) {
    this.authRoles = authRoles;
  }

  includesAllItems(arr: string[], target: string[]): boolean {
    return target.every(v => arr.includes(v));
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const roles = request.user?.roles as string[];
    if (!this.includesAllItems(roles, this.authRoles))
      throw new Unauthorized('You have no permission', 'Unauthorized');

    return ok({});
  }
}
