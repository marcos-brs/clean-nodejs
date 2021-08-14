import Joi from 'joi';

export const signupSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    confirmationEmail: Joi.string().valid(Joi.ref('email')).required(),
    password: Joi.string().min(8).required(),
    confirmationPassword: Joi.string().valid(Joi.ref('password')).required(),
    dateOfBirth: Joi.string().isoDate().required(),
    ciclo: Joi.string().required(),
    estado: Joi.string().min(2).max(2).required(),
    school: Joi.string().required(),
  }),
});
