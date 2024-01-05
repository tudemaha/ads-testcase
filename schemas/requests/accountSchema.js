const Joi = require("joi");

const sellerRegister = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	password_repeat: Joi.ref("password"),
	name: Joi.string().required(),
	address: Joi.string().required(),
	phone: Joi.string().required(),
}).with("password", "password_repeat");

const customerRegister = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	password_repeat: Joi.ref("passowrd"),
	name: Joi.string().required(),
	phone: Joi.string().required(),
}).with("password", "password_repeat");

const login = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

module.exports = { sellerRegister, customerRegister, login };
