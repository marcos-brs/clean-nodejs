import Joi from 'joi';

export const createRoleSchema = Joi.object({
  body: Joi.object({
    role: Joi.string().required(),
  }),
});
