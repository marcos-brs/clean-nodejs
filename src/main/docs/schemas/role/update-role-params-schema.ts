export const updateRoleParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    role: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['id', 'role'],
};
