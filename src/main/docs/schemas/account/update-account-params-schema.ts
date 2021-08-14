export const updateAccountParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
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
  required: ['id'],
};
