import { HttpRequest } from '@/presentation/protocols';
import { hasPermission } from '@/presentation/middlewares';

describe('hasPermissionMiddleware', () => {
  it('Should return statusCode 200 if user has permission', async () => {
    const necessary_permissions = ['role_1', 'role_2'];
    const request: HttpRequest = {
      user: {
        id: 'any_id',
        roles: ['role_1', 'role_2', 'role_3'],
      },
    };

    const permissionMiddleware = hasPermission(necessary_permissions);
    const response = await permissionMiddleware(request);

    expect(response.statusCode).toEqual(200);
  });

  it('Should return statusCode 401 if user has no permission', async () => {
    const necessary_permissions = ['role_1', 'role_2'];
    const request: HttpRequest = {
      user: {
        id: 'any_id',
        roles: ['role_1', 'role_3'],
      },
    };

    const permissionMiddleware = hasPermission(necessary_permissions);
    const response = await permissionMiddleware(request);

    expect(response.statusCode).toEqual(401);
  });
});
