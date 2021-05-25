export const listAccountsResultSchema = {
  type: 'object',
  properties: {
    accounts: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['accounts'],
};
