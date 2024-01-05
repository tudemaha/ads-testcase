const { Router } = require("express");
const { verifyToken } = require("../middlewares/jwt");
const validate = require("./../middlewares/bodyValidator");
const cartSchema = require("./../schemas/requests/cartSchema");
const {
	addCartItemHandler,
	getCartItemsHandler,
} = require("../controller/cartController");

const cartRouter = Router();

cartRouter.post("/", verifyToken(2), validate(cartSchema), addCartItemHandler);
cartRouter.get("/", verifyToken(2), getCartItemsHandler);

module.exports = cartRouter;
