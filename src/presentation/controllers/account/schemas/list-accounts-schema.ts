import Joi from 'joi';

export const listAccountsSchema = Joi.object({
  body: Joi.object({}),
});
