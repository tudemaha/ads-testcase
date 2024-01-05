const { Router } = require("express");
const validate = require("./../middlewares/bodyValidator");
const { verifyToken } = require("../middlewares/jwt");
const orderSchema = require("./../schemas/requests/orderSchema");
const {
	makeOrderHandler,
	getOrderHandler,
	getOrderItemsByIdHandler,
} = require("../controller/orderController");

const orderRouter = Router();

orderRouter.post("/", verifyToken(2), validate(orderSchema), makeOrderHandler);
orderRouter.get("/seller", verifyToken(1), getOrderHandler);
orderRouter.get("/:id(\\d+)", verifyToken(1), getOrderItemsByIdHandler);

module.exports = orderRouter;
