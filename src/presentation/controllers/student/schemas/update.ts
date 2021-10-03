import Joi from 'joi';

export const updateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.string().isoDate(),
    ciclo: Joi.string(),
    state: Joi.string(),
    school: Joi.string(),
  }),
});
