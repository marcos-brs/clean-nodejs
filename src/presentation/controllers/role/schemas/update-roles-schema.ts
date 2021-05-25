import Joi from 'joi';

export const updateRoleSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().uuid().required(),
    role: Joi.string().required(),
  }),
});
