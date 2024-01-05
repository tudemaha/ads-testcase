const { Router } = require("express");
const { verifyToken } = require("../middlewares/jwt");
const validate = require("./../middlewares/bodyValidator");
const productSchema = require("./../schemas/requests/productSchema");
const dummyToken = require("./dummy");

const { DataTypes } = require("sequelize");
const Product = require("./../models/product");
const { sequelize } = require("./../models/index");
const ProductRepository = require("./../repositories/ProductRepository");
const Response = require("./../schemas/response/defaultResponse");

const productRouter = Router();

productRouter.post(
	"",
	dummyToken,
	validate(productSchema),
	async (req, res) => {
		let response;
		let reqBody = req.body;
		const decodedToken = res.locals.decodedToken;
		const productModel = Product(sequelize, DataTypes);
		const productRepo = new ProductRepository(productModel);
		reqBody = { seller_id: decodedToken.id, ...reqBody };

		const product = await productRepo.create(reqBody);
		if (product instanceof Error) {
			response = Response.defaultBadRequest({
				insert_error: product.message,
			});
			return res.status(response.status).json(response);
		}

		response = Response.defaultCreated("success insert product", {});
		return res.status(response.status).json(response);
	}
);

module.exports = productRouter;
