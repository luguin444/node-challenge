const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "user/admin").required(),
});

const authenticateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  createUserSchema,
  authenticateUserSchema,
};
