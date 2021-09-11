import Joi from 'joi';

export const updateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.string().isoDate(),
    materia: Joi.string(),
    cargo: Joi.array().items(Joi.string()),
  }),
});
