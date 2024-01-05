const Joi = require("joi");

const cart = Joi.object({
	quantity: Joi.number().integer().required(),
	note: Joi.string(),
	product_id: Joi.number().integer().required(),
});

module.exports = cart;
