import Joi from "joi";

export const advertSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().valid(
    "automobiles",
    "consumable-goods",
    "fashion",
    "commercial-equipment",
    "beauty-and-personal-care",
    "animal-and-pets"
  ).required(),
  status: Joi.string().valid("active", "inactive").optional(),
});
