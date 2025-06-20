import Joi from "joi";


export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
  role: Joi.string().valid("user", "vendor").optional(),
});



export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
