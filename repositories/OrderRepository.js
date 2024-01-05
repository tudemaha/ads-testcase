class OrderRepository {
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	async create(orderData, transaction) {
		const options = transaction ? { transaction } : {};
		try {
			const order = await this.orderModel.create(orderData, options);
			return order;
		} catch (error) {
			return new Error(`Failed to add order: ${error.message}`);
		}
	}

	async getBySellerId(SellerId) {
		try {
			const orders = await this.orderModel.findAll({
				where: {
					SellerId,
				},
				order: [["createdAt", "DESC"]],
			});
			return orders;
		} catch (error) {
			return new Error(`Failed to get order: ${error.message}`);
		}
	}

	async get(id) {
		const where = { id } ?? {};
		try {
			const orders = await this.orderModel.findAll({
				where,
			});
			return orders;
		} catch (error) {
			return new Error(`Failed to get order: ${error.message}`);
		}
	}
}

module.exports = OrderRepository;
