import Joi from 'joi';

export const listingSchema = Joi.object({
  body: Joi.object({
    pageIndex: Joi.number().integer().greater(0).required(),
    pageSize: Joi.number().integer().greater(0).required(),
  }),
});
