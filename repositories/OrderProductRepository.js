const { Op } = require("sequelize");

class OrderRepository {
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	async createBulk(orderProductsData, transaction) {
		const options = transaction ? { transaction } : {};

		try {
			const orderProducts = await this.orderModel.bulkCreate(
				orderProductsData,
				options
			);
			return orderProducts;
		} catch (error) {
			return new Error(`Failed to add order products: ${error.message}`);
		}
	}

	async getByOrderId(OrderId) {
		try {
			const orderProducts = await this.orderModel.findAll({
				where: {
					OrderId,
				},
			});
			return orderProducts;
		} catch (error) {
			return new Error(`Failed to get order products: ${error.message}`);
		}
	}
}

module.exports = OrderRepository;
