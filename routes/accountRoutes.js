const { Router } = require("express");
const validate = require("./../middlewares/bodyValidator");
const accountSchema = require("./../schemas/requests/accountSchema");
const {
	sellerRegisterHandler,
	customerRegisterHandler,
	loginHandler,
} = require("./../controller/accountController");

const accountRouter = Router();

accountRouter.post(
	"/register/seller",
	validate(accountSchema.sellerRegister),
	sellerRegisterHandler
);
accountRouter.post(
	"/register/customer",
	validate(accountSchema.customerRegister),
	customerRegisterHandler
);
accountRouter.post("/login", validate(accountSchema.login), loginHandler);

module.exports = accountRouter;
