export const createAccountResultSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
    },
  },
  required: ['success'],
};
