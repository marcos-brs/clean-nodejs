import Joi from 'joi';

export const createAccountSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmationPassword: Joi.string().valid(Joi.ref('password')).required(),
    roles: Joi.array().items(Joi.string().uuid()).required(),
  }),
});
