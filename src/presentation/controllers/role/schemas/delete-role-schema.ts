import Joi from 'joi';

export const deleteRoleSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});
