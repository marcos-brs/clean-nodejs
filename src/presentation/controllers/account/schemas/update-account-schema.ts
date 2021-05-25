import Joi from 'joi';

export const updateAccountSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    confirmationPassword: Joi.string().valid(Joi.ref('password')).optional(),
    roles: Joi.array().items(Joi.string().uuid()).optional(),
  }),
});
