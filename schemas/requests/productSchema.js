const Joi = require("joi");

const product = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	stock: Joi.number().integer().required(),
	price: Joi.number().required(),
});

module.exports = product;
