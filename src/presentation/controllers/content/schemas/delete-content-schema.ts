import Joi from 'joi';

export const deleteContentSchema = Joi.object({
  body: Joi.object({
    _id: Joi.string().required(),
  }),
});
