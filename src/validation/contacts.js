import Joi from 'joi';

export const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  year: Joi.number().required(),
  gender: Joi.string().valid('male', 'female').required(),
  onDuty: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  year: Joi.number(),
  gender: Joi.string().valid('male', 'female'),
  onDuty: Joi.boolean(),
});