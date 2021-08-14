export const createAccountParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    confirmationPassword: {
      type: 'string',
    },
    roles: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['name', 'email', 'password', 'confirmationPassword', 'roles'],
};
