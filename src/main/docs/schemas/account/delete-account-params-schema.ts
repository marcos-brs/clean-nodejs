export const deleteAccountParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  required: ['id'],
};
