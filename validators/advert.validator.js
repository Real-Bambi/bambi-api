import Joi from "joi";

export const advertSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").optional(),
});
