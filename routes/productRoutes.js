const { Router } = require("express");
const { verifyToken } = require("../middlewares/jwt");
const validate = require("./../middlewares/bodyValidator");
const productSchema = require("./../schemas/requests/productSchema");
const dummyToken = require("./dummy");

const { Product, Seller } = require("./../models/index");
const ProductRepository = require("./../repositories/ProductRepository");
const Response = require("./../schemas/response/defaultResponse");
const SellerRepository = require("../repositories/SellerRepository");

const productRouter = Router();

productRouter.post(
	"/",
	dummyToken,
	validate(productSchema),
	async (req, res) => {
		let response;
		let reqBody = req.body;
		const decodedToken = res.locals.decodedToken;
		const productRepo = new ProductRepository(Product);
		const sellerRepo = new SellerRepository(Seller);

		const seller = await sellerRepo.getByAccountId(decodedToken.id);
		if (!seller) {
			response = Response.defaultNotFound({ create_error: `seller not found` });
			return res.status(response.status).json(response);
		}
		reqBody = { SellerId: seller.id, ...reqBody };

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

productRouter.get("/", async (req, res) => {
	let response;
	const { seller, name } = req.query;
	const productRepo = new ProductRepository(Product);

	const productsRaw = await productRepo.getByQuery(seller, name);
	if (productsRaw instanceof Error) {
		response = Response.defaultInternalError({
			get_error: productsRaw.message,
		});
		return res.status(response.status).json(response);
	}
	const products = productsRaw.map((product) => {
		return {
			id: product.id,
			name: product.name,
			price: product.price,
			seller: product.Seller.name,
		};
	});

	response = Response.defaultOK("success get products", { products });
	return res.status(response.status).json(response);
});

productRouter.get("/:id(\\d+)", async (req, res) => {
	let response;
	const { id } = req.params;
	if (!id) {
		response = Response.defaultBadRequest({ get_error: "no product ID given" });
		return res.status(response.status).json(response);
	}
	const productRepo = new ProductRepository(Product);

	const productRaw = await productRepo.getById(id);
	if (productRaw instanceof Error) {
		response = Response.defaultInternalError({ get_error: productRaw.message });
		return res.status(response.status).json(response);
	}
	if (!productRaw) {
		response = Response.defaultNotFound();
		return res.status(response.status).json(response);
	}

	const product = {
		id: productRaw.id,
		name: productRaw.name,
		price: productRaw.price,
		description: productRaw.description,
		stock: productRaw.stock,
	};
	const seller = {
		id: productRaw.Seller.id,
		name: productRaw.Seller.name,
		address: productRaw.Seller.address,
	};
	response = Response.defaultOK("success get product", { product, seller });
	return res.status(response.status).json(response);
});

module.exports = productRouter;
