import Joi from 'joi';

export const listRolesSchema = Joi.object({
  body: Joi.object({}),
});
