const Joi = require('joi');

export const InProductSchema = Joi.object({
	title: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),

	description: Joi.string()
		.alphanum()
		.min(1)
		.max(300)
		.required(),

	price: Joi.number()
		.min(1)
		.max(9999)
		.required(),

	count: Joi.number()
		.min(0)
		.max(9999)
		.required(),
});