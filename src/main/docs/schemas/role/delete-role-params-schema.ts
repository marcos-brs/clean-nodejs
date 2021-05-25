export const deleteRoleParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  required: ['id'],
};
