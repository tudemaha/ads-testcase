const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const {
	defaultUnauthorized,
	defaultForbidden,
	defaultInternalError,
} = require("./../schemas/response/defaultResponse");
const AccountRepository = require("../repositories/AccountRepository");
const { sequelize } = require("./../models/index");
const Account = require("./../models/account");

const createToken = (payload) => {
	const secret = process.env.SIGNKEY;
	const token = jwt.sign(payload, secret, { expiresIn: "8h" });
	return token;
};

const verifyToken = (requiredRole) => {
	const tokenMiddleware = (req, res, next) => {
		const secret = process.env.SIGNKEY;
		let response;

		let decodedToken;
		let token = req.get("Authorization");
		if (!token) {
			response = defaultUnauthorized({ jwt_error: "token not provided" });
			return res.status(response.status).json(response);
		}

		token = token.split(" ");
		if (token[0] != "Bearer") {
			response = defaultUnauthorized({ jwt_error: "wrong token format" });
			return res.status(response.status).json(response);
		}
		token = token[token.length - 1];

		try {
			decodedToken = jwt.verify(token, secret, { maxAge: "8h" });
		} catch (error) {
			response = defaultUnauthorized({ error });
			return res.status(response.status).json(response);
		}

		const accountModel = Account(sequelize, DataTypes);
		const accountRepo = new AccountRepository(accountModel);
		const account = accountRepo.get(decodedToken.payload.email);
		if (account instanceof Error) {
			response = defaultInternalError({ jwt_error: account });
			return res.status(response.status).json(response);
		}

		if (account === null && decodedToken.payload.role !== requiredRole) {
			response = defaultForbidden();
			return res.status(response.status).json(response);
		}
		res.locals.decodedToken = decodedToken.payload;

		return next();
	};

	return tokenMiddleware;
};

module.exports = { createToken, verifyToken };
