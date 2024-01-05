const { Op } = require("sequelize");
const { Product, Seller } = require("./../models");

class CartRepository {
	constructor(cartModel) {
		this.cartModel = cartModel;
	}

	async create(cartData) {
		try {
			const cart = await this.cartModel.create(cartData);
			return cart;
		} catch (error) {
			return new Error(`Failed to add cart: ${error.message}`);
		}
	}

	async get(CustomerId) {
		try {
			const cart = await this.cartModel.findAll({
				where: {
					CustomerId,
				},
				include: {
					model: Product,
					attributes: ["id", "SellerId"],
					include: {
						model: Seller,
						attributes: ["name"],
					},
					order: [["SellerId", "ASC"]],
				},
				order: [["updatedAt", "DESC"]],
			});
			return cart;
		} catch (error) {
			return new Error(`Failed to get cart: ${error.message}`);
		}
	}

	async update(id, newCartData) {
		const cart = await this.get(id);
		if (cart instanceof Error) {
			return new Error(cart.message);
		}

		cart.quantiry = newCartData.quantiry;
		cart.note = newCartData.note;

		try {
			await cart.save();
			return cart;
		} catch (error) {
			return new Error(`Failed to update cart: ${error.message}`);
		}
	}

	async delete(ids, transaction) {
		const options = transaction ? { transaction } : {};
		try {
			const product = await this.cartModel.destroy({
				where: {
					id: { [Op.or]: ids },
				},
				options,
			});
			return product;
		} catch (error) {
			return new Error(`Failed to delete cart: ${error.message}`);
		}
	}
}

module.exports = CartRepository;
