const { Router } = require("express");

const { DataTypes } = require("sequelize");
const { sequelize } = require("./../models/index");
const Account = require("./../models/account");
const Seller = require("./../models/seller");
const AccountRepository = require("./../repositories/AccountRepository");
const SellerRepository = require("./../repositories/SellerRepository");
const validate = require("./../middlewares/bodyValidator");
const accountSchema = require("./../schemas/requests/accountSchema");
const { createBcrypt, checkBcrypt } = require("./../pkg/bcrypt");
const Response = require("../schemas/response/defaultResponse");

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

module.exports = accountRouter;
