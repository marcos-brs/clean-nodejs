import {
  createAccountParamsSchema,
  createAccountResultSchema,
  deleteAccountParamsSchema,
  deleteAccountResultSchema,
  listAccountsResultSchema,
  updateAccountParamsSchema,
  updateAccountResultSchema,
} from './schemas/account';

import {
  apiKeyAuthSchema,
  signInParamsSchema,
  signInResultSchema,
} from './schemas/auth';

import {
  createRoleParamsSchema,
  createRoleResultSchema,
  deleteRoleParamsSchema,
  deleteRoleResultSchema,
  listRolesResultSchema,
  updateRoleParamsSchema,
  updateRoleResultSchema,
} from './schemas/role';

import { errorSchema } from './schemas/error-schema';

export default {
  createAccountParamsSchema,
  createAccountResultSchema,
  deleteAccountParamsSchema,
  deleteAccountResultSchema,
  listAccountsResultSchema,
  updateAccountParamsSchema,
  updateAccountResultSchema,
  apiKeyAuthSchema,
  signInParamsSchema,
  signInResultSchema,
  createRoleParamsSchema,
  createRoleResultSchema,
  deleteRoleParamsSchema,
  deleteRoleResultSchema,
  listRolesResultSchema,
  updateRoleParamsSchema,
  updateRoleResultSchema,
  error: errorSchema,
};
