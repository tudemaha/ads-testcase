const { Router } = require("express");

const { DataTypes } = require("sequelize");
const { sequelize } = require("./../models/index");
const Account = require("./../models/account");
const Seller = require("./../models/seller");
const Customer = require("./../models/customer");
const AccountRepository = require("./../repositories/AccountRepository");
const SellerRepository = require("./../repositories/SellerRepository");
const CustomerRepository = require("./../repositories/CustomerRepository");
const validate = require("./../middlewares/bodyValidator");
const accountSchema = require("./../schemas/requests/accountSchema");
const { createBcrypt, checkBcrypt } = require("./../pkg/bcrypt");
const Response = require("../schemas/response/defaultResponse");
const { createToken } = require("./../middlewares/jwt");

const accountRouter = Router();

accountRouter.post(
	"/register/seller",
	validate(accountSchema.sellerRegister),
	async (req, res) => {
		let response;
		const reqBody = req.body;
		const accountModel = Account(sequelize, DataTypes);
		const sellerModel = Seller(sequelize, DataTypes);
		const accountRepo = new AccountRepository(accountModel);
		const sellerRepo = new SellerRepository(sellerModel);

		const bcryptPass = await createBcrypt(reqBody.password);
		const newAccount = {
			email: reqBody.email,
			password: bcryptPass,
			role_id: 1,
		};
		let newSeller = {
			name: reqBody.name,
			address: reqBody.address,
			phone: reqBody.phone,
		};

		const t = await sequelize.transaction();
		try {
			const account = await accountRepo.create(newAccount, t);
			newSeller = { account_id: account.id, ...newSeller };
			const seller = await sellerRepo.create(newSeller, t);
			if (account instanceof Error || seller instanceof Error) {
				throw new Error(`${account.message} || ${seller.message}`);
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			response = Response.defaultBadRequest({ insert_error: error.message });
			return res.status(response.status).json(response);
		}

		response = Response.defaultCreated("account created successfully");
		return res.status(response.status).json(response);
	}
);

accountRouter.post(
	"/register/customer",
	validate(accountSchema.customerRegister),
	async (req, res) => {
		let response;
		const reqBody = req.body;
		const accountModel = Account(sequelize, DataTypes);
		const customerModel = Customer(sequelize, DataTypes);
		const accountRepo = new AccountRepository(accountModel);
		const customerRepo = new CustomerRepository(customerModel);

		const bcryptPass = await createBcrypt(reqBody.password);
		const newAccount = {
			email: reqBody.email,
			password: bcryptPass,
			role_id: 2,
		};
		let newCustomer = {
			name: reqBody.name,
			phone: reqBody.phone,
		};

		const t = await sequelize.transaction();
		try {
			const account = await accountRepo.create(newAccount, t);
			newCustomer = { account_id: account.id, ...newCustomer };
			const customer = await customerRepo.create(newCustomer, t);
			if (account instanceof Error || customer instanceof Error) {
				throw new Error(`${account.message} || ${customer.message}`);
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			response = Response.defaultBadRequest({ insert_error: error.message });
			return res.status(response.status).json(response);
		}

		response = Response.defaultCreated("account created successfully");
		return res.status(response.status).json(response);
	}
);

accountRouter.post(
	"/login",
	validate(accountSchema.login),
	async (req, res) => {
		let response;
		const reqBody = req.body;
		const accountModel = Account(sequelize, DataTypes);
		const accountRepo = new AccountRepository(accountModel);

		const account = await accountRepo.get(reqBody.email);
		if (account instanceof Error) {
			response = Response.defaultInternalError({ login_error: error.message });
			return res.status(response.status).json(response);
		}
		if (!account) {
			response = Response.defaultNotFound();
			return res.status(response.status).json(response);
		}

		const check = await checkBcrypt(account.password, reqBody.password);
		if (!check) {
			response = Response.defaultNotFound();
			return res.status(response.status).json(response);
		}

		const payload = {
			id: account.id,
			email: account.email,
			role: account.role_id,
		};
		const jwt = createToken(payload);
		response = Response.defaultOK("login success");
		res.setHeader("Authorization", jwt);
		return res.status(response.status).json(response);
	}
);

module.exports = accountRouter;
