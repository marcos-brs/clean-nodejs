export const createRoleParamsSchema = {
  type: 'object',
  properties: {
    role: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['role'],
};
