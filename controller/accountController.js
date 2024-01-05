const { Account, Seller, Customer, sequelize } = require("./../models");
const AccountRepository = require("./../repositories/AccountRepository");
const SellerRepository = require("./../repositories/SellerRepository");
const CustomerRepository = require("./../repositories/CustomerRepository");
const Response = require("../schemas/response/defaultResponse");
const { createBcrypt, checkBcrypt } = require("./../pkg/bcrypt");
const { createToken } = require("./../middlewares/jwt");

const sellerRegisterHandler = async (req, res) => {
	let response;
	const reqBody = req.body;
	const accountRepo = new AccountRepository(Account);
	const sellerRepo = new SellerRepository(Seller);

	const bcryptPass = await createBcrypt(reqBody.password);
	const newAccount = {
		email: reqBody.email,
		password: bcryptPass,
		RoleId: 1,
	};
	let newSeller = {
		name: reqBody.name,
		address: reqBody.address,
		phone: reqBody.phone,
	};

	const t = await sequelize.transaction();
	try {
		const account = await accountRepo.create(newAccount, t);
		newSeller = { AccountId: account.id, ...newSeller };
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
};

const customerRegisterHandler = async (req, res) => {
	let response;
	const reqBody = req.body;
	const accountRepo = new AccountRepository(Account);
	const customerRepo = new CustomerRepository(Customer);

	const bcryptPass = await createBcrypt(reqBody.password);
	const newAccount = {
		email: reqBody.email,
		password: bcryptPass,
		RoleId: 2,
	};
	let newCustomer = {
		name: reqBody.name,
		phone: reqBody.phone,
	};

	const t = await sequelize.transaction();
	try {
		const account = await accountRepo.create(newAccount, t);
		newCustomer = { AccountId: account.id, ...newCustomer };
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
};

const loginHandler = async (req, res) => {
	let response;
	const reqBody = req.body;
	const accountRepo = new AccountRepository(Account);

	const account = await accountRepo.get(reqBody.email);
	if (account instanceof Error) {
		response = Response.defaultInternalError({ login_error: account.message });
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
		role: account.RoleId,
	};
	const jwt = createToken(payload);
	response = Response.defaultOK("login success");
	res.setHeader("Authorization", jwt);
	return res.status(response.status).json(response);
};

module.exports = {
	sellerRegisterHandler,
	customerRegisterHandler,
	loginHandler,
};
