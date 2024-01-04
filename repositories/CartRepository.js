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

	async get(cartId) {
		const where = {};
		if (cartId) {
			where.id = cartId;
		}

		try {
			const cart = await this.cartModel.findAll({
				where,
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

	async delete(id) {
		try {
			const product = await this.cartModel.destroy({
				where: { id },
			});
			return product;
		} catch (error) {
			return new Error(`Failed to delete cart: ${error.message}`);
		}
	}
}

module.exports = CartRepository;
