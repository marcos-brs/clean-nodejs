import Joi from 'joi';

export const deleteSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
});
