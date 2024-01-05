const Joi = require("joi");

const order = Joi.object({
	seller_id: Joi.number().integer().required(),
	carts: Joi.array().items(Joi.number()).required(),
});

module.exports = order;
