import Joi from 'joi';

export const getSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
});
