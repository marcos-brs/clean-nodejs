import Joi from 'joi';

export const getSchema = Joi.object({
  body: Joi.object({
    url: Joi.string().email().required(),
  }),
});
