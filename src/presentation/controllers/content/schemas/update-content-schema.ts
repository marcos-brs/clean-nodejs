import Joi from 'joi';

export const updateContentSchema = Joi.object({
  body: Joi.object({
    destination_url: Joi.string().required(),
    title:  Joi.string().optional(),
    description: Joi.string().optional(),
    owner_id: Joi.string().optional(),
    posted_at:  Joi.date().optional(),
  }),
});
