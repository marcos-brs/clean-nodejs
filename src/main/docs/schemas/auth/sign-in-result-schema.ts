export const signInResultSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
  },
  required: ['accessToken'],
};
