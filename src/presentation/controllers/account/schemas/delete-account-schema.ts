import Joi from 'joi';

export const deleteAccountSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});
