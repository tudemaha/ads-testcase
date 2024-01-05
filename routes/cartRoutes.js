const { Router } = require("express");
const { verifyToken } = require("../middlewares/jwt");
const validate = require("./../middlewares/bodyValidator");
const cartSchema = require("./../schemas/requests/cartSchema");

const { Cart, Customer } = require("./../models");
const CartRepository = require("./../repositories/CartRepository");
const CustomerRepository = require("./../repositories/CustomerRepository");
const Response = require("./../schemas/response/defaultResponse");

const decodedToken = require("./dummy");

const cartRouter = Router();

cartRouter.post("/", verifyToken(2), validate(cartSchema), async (req, res) => {
	let response;
	let reqBody = req.body;
	const decodedToken = res.locals.decodedToken;
	const cartRepo = new CartRepository(Cart);
	const customerRepo = new CustomerRepository(Customer);

	const customer = await customerRepo.getByAccountId(decodedToken.id);
	if (!customer) {
		response = Response.defaultNotFound({ create_error: "customer not found" });
		return res.status(response.status).json(response);
	}

	reqBody = {
		ProductId: reqBody.product_id,
		CustomerId: customer.id,
		...reqBody,
	};
	const cart = await cartRepo.create(reqBody);
	if (cart instanceof Error) {
		response = Response.defaultBadRequest({ create_error: cart.message });
		return res.status(response.status).json(response);
	}

	response = Response.defaultOK("cart item added successfully");
	return res.status(response.status).json(response);
});

cartRouter.get("/", verifyToken(2), async (req, res) => {
	let response;
	const decodedToken = res.locals.decodedToken;
	const cartRepo = new CartRepository(Cart);
	const customerRepo = new CustomerRepository(Customer);

	const customer = await customerRepo.getByAccountId(decodedToken.id);
	if (!customer) {
		response = Response.defaultNotFound({ get_error: "customer not found" });
		return res.status(response.status).json(response);
	}

	const cartsRaw = await cartRepo.get(customer.id);
	if (cartsRaw instanceof Error) {
		response = Response.defaultInternalError({ get_error: cartsRaw.message });
		return res.status(response.status).json(response);
	}
	const carts = cartsRaw.map((cart) => {
		return {
			id: cart.id,
			quantity: cart.quantity,
			note: cart.note ?? "",
			product_id: cart.ProductId,
			seller: {
				id: cart.Product.SellerId,
				name: cart.Product.Seller.name,
			},
		};
	});

	response = Response.defaultOK("success get cart items", { carts });
	return res.status(response.status).json(response);
});

module.exports = cartRouter;
