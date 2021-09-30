import Joi from 'joi';

export const createContentSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    destination_url: Joi.string().required(),
    posted_at: Joi.date().required(),
  }),
});
