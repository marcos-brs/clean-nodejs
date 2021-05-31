import { Encrypter } from '../../infra/cryptography/protocols';
import { TokenPayload } from '../../infra/http/protocols';
import { Unauthorized } from '../../shared/errors';
import { ok, unauthorized } from '../helper';
import { HttpRequest, HttpResponse } from '../protocols';

function getTokenFromHeader(request: HttpRequest) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized('EmptyJWT', 'JWT is missing');
  }

  const [prefix, token] = authHeader.split(' ');

  if (prefix !== 'Bearer') {
    throw new Unauthorized('BadJWTFormat', 'Token is not Bearer type');
  }

  return token;
}

function badFormat(decodedPayload: any): decodedPayload is TokenPayload {
  return !(
    decodedPayload &&
    decodedPayload.exp &&
    typeof decodedPayload.exp === 'number' &&
    decodedPayload.iat &&
    typeof decodedPayload.iat === 'number' &&
    decodedPayload.roles &&
    typeof decodedPayload.roles === 'object' &&
    decodedPayload.id &&
    typeof decodedPayload.id === 'string'
  );
}

export const addTokenToRequest =
  (encrypter: Encrypter) =>
  async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const token = getTokenFromHeader(request);
      const decoded = await encrypter.decrypt(token);

      if (badFormat(decoded)) {
        throw new Unauthorized('BadPayloadFormat', 'Bad Payload format');
      }

      const { id, roles } = decoded as TokenPayload;

      return ok({
        authUser: {
          id,
          roles,
        },
      });
    } catch (err) {
      if (err instanceof Unauthorized) {
        if (err?.code === 'EmptyJWT') return ok({});
      }
      return unauthorized(err);
    }
  };
