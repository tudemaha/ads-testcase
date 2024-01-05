const { Router } = require("express");
const { verifyToken } = require("../middlewares/jwt");
const validate = require("./../middlewares/bodyValidator");
const productSchema = require("./../schemas/requests/productSchema");
const {
	addProductHandler,
	getAllProductHandler,
	getProductByIdHandler,
} = require("../controller/productController");

const productRouter = Router();

productRouter.post(
	"/",
	verifyToken(1),
	validate(productSchema),
	addProductHandler
);
productRouter.get("/", getAllProductHandler);
productRouter.get("/:id(\\d+)", getProductByIdHandler);

module.exports = productRouter;
