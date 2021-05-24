import Joi from 'joi';

export const testeSchema = Joi.object({
  body: Joi.object({
    ok: Joi.boolean().required(),
    teste123: Joi.string().required(),
  }),
});
