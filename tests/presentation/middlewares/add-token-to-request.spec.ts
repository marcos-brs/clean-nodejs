import { HttpRequest } from '@/presentation/protocols';
import { addTokenToRequest } from '@/presentation/middlewares/add-token-to-request';
import { Encrypter } from '@/infra/cryptography/protocols';

class EncrypterStub implements Encrypter {
  async encrypt(data: any): Promise<string> {
    return Promise.resolve('jwtToken');
  }

  async decrypt(ciphertext: string): Promise<any> {
    return Promise.resolve({
      id: 'any_id',
      roles: ['role1', 'role2'],
      iat: 1,
      exp: 1,
    });
  }
}

describe('addTokenToRequest Middleware', () => {
  it('Should return user information', async () => {
    const request: HttpRequest = {
      headers: {
        authorization: `Bearer jwtToken`,
      },
    };

    const addTokenToRequestMiddleware = addTokenToRequest(new EncrypterStub());
    const response = await addTokenToRequestMiddleware(request);

    expect(response.body).toEqual({
      authUser: {
        id: 'any_id',
        roles: ['role1', 'role2'],
      },
    });
  });
});
