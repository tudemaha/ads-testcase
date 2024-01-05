const { Router } = require("express");
const validate = require("./../middlewares/bodyValidator");
const { verifyToken } = require("../middlewares/jwt");
const orderSchema = require("./../schemas/requests/orderSchema");

const {
	Product,
	Order,
	OrderProduct,
	Customer,
	Seller,
	Cart,
	sequelize,
} = require("./../models");
const CartRepository = require("./../repositories/CartRepository");
const CustomerRepository = require("./../repositories/CustomerRepository");
const ProductRepository = require("./../repositories/ProductRepository");
const OrderRepository = require("./../repositories/OrderRepository");
const OrderProductRepository = require("./../repositories/OrderProductRepository");
const SellerRepository = require("./../repositories/SellerRepository");
const Response = require("./../schemas/response/defaultResponse");

const orderRouter = Router();

orderRouter.post(
	"/",
	verifyToken(2),
	validate(orderSchema),
	async (req, res) => {
		let response;
		let reqBody = req.body;
		const decodedToken = res.locals.decodedToken;
		const productRepo = new ProductRepository(Product);
		const customerRepo = new CustomerRepository(Customer);
		const orderRepo = new OrderRepository(Order);
		const orderProductRepo = new OrderProductRepository(OrderProduct);
		const cartRepo = new CartRepository(Cart);

		const customer = await customerRepo.getByAccountId(decodedToken.id);
		if (!customer) {
			response = Response.defaultNotFound({
				create_error: "customer not found",
			});
			return res.status(response.status).json(response);
		}

		const products = await productRepo.getOrderProducts(
			reqBody.carts,
			reqBody.seller_id,
			customer.id
		);
		if (products instanceof Error) {
			response = Response.defaultInternalError({
				create_error: products.message,
			});
			return res.status(response.status).json(response);
		}
		if (products.length === 0) {
			response = Response.defaultNotFound({
				create_error: "no items found for checkout on this seller",
			});
			return res.status(response.status).json(response);
		}

		let total_price = 0;
		let cartToDelete = [];
		let orderProducts = [];
		products.forEach((product) => {
			product.Carts.forEach((cart) => {
				cartToDelete.push(cart.id);
				total_price += product.price * cart.quantity;
				orderProducts.push({
					name: product.name,
					description: product.description,
					price: product.price,
					quantity: cart.quantity,
					quantity_price: product.price * cart.quantity,
					ProductId: product.id,
				});
			});
		});

		const t = await sequelize.transaction();
		try {
			const order = await orderRepo.create(
				{
					status: 1,
					total_price,
					SellerId: reqBody.seller_id,
					CustomerId: customer.id,
				},
				t
			);
			if (order instanceof Error) {
				throw new Error(order.message);
			}

			orderProducts = orderProducts.map((orderProduct) => ({
				OrderId: order.id,
				...orderProduct,
			}));
			const order_product = await orderProductRepo.createBulk(orderProducts, t);
			if (order_product instanceof Error) {
				throw new Error(order.message);
			}

			const carts = await cartRepo.delete(cartToDelete, t);
			if (carts instanceof Error) {
				throw new Error(order.message);
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			response = Response.defaultBadRequest({ insert_error: error.message });
			return res.status(response.status).json(response);
		}

		response = Response.defaultCreated("order created successfully", {
			total_price,
		});
		return res.status(response.status).json(response);
	}
);

orderRouter.get("/seller", verifyToken(1), async (req, res) => {
	let response;
	const decodedToken = res.locals.decodedToken;
	const sellerRepo = new SellerRepository(Seller);
	const orderRepo = new OrderRepository(Order);

	const seller = await sellerRepo.getByAccountId(decodedToken.id);
	if (!seller) {
		response = Response.defaultNotFound({ create_error: "seller not found" });
		return res.status(response.status).json(response);
	}

	let orders = await orderRepo.getBySellerId(seller.id);
	orders = orders.map((order) => ({
		id: order.id,
		status: order.status,
		total_price: order.total_price,
		customer_id: order.CustomerId,
		created_at: order.createdAt,
	}));
	response = Response.defaultOK("success get orders", { orders });
	return res.status(response.status).json(response);
});

orderRouter.get("/:id(\\d+)", verifyToken(1), async (req, res) => {
	let response;
	const { id } = req.params;
	const orderProductRepo = new OrderProductRepository(OrderProduct);

	const orderProducts = await orderProductRepo.getByOrderId(id);
	if (orderProducts.length === 0) {
		response = Response.defaultNotFound();
		return res.status(response.status).json(response);
	}

	const order_items = orderProducts.map((item) => ({
		id: item.id,
		name: item.name,
		description: item.description,
		price: item.price,
		quantity: item.quantity,
		quantity_price: item.quantity_price,
		product_id: item.ProductId,
	}));

	response = Response.defaultOK("success get order items", { order_items });
	return res.status(response.status).json(response);
});

module.exports = orderRouter;
