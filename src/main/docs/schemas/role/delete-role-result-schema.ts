export const deleteRoleResultSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
    },
  },
  required: ['success'],
};
