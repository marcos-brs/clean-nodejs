import { HttpRequest } from '@/presentation/protocols';
import { addTokenToRequest } from '@/presentation/middlewares/add-token-to-request';
import { env } from '@/main/env';
import { JwtAdapter } from '@/infra/cryptography/adapters/jwt-adapter';

describe('addTokenToRequest Middleware', () => {
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFueV9pZCIsInJvbGVzIjpbInJvbGUxIiwicm9sZTIiXSwiaWF0IjoxNjIxOTUzMTMzLCJleHAiOjE2MjIwMzk1MzN9.zU3LgdL7V0u9qkh-KkpbWPscWIN4F5HJriDv6HPL0sw';
  beforeAll(() => {
    jest.resetModules();
    env.jwtSecret = '123456';
  });
  it('Should return user information', async () => {
    const request: HttpRequest = {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const addTokenToRequestMiddleware = addTokenToRequest(new JwtAdapter());
    const response = await addTokenToRequestMiddleware(request);

    expect(response.body).toEqual({
      authUser: {
        id: 'any_id',
        roles: ['role1', 'role2'],
      },
    });
  });
});
