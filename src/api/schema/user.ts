import Joi from "joi";

export const userSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
});
