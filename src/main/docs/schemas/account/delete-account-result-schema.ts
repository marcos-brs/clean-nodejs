export const deleteAccountResultSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
    },
  },
  required: ['success'],
};
