import { apiKeyAuthSchema } from './schemas/auth/api-key-auth-schema';

import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
} from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
};
