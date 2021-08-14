export const listRolesResultSchema = {
  type: 'object',
  properties: {
    roles: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['roles'],
};
