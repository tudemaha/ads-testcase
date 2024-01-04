"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Order.belongsTo(models.Seller, { foreignKey: "seller_id" });
			Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
			Order.hasMany(models.OrderProduct);
		}
	}
	Order.init(
		{
			status: DataTypes.INTEGER,
			total_price: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
