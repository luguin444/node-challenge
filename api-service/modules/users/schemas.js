const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "user/admin").required(),
});

module.exports = {
  createUserSchema,
};
