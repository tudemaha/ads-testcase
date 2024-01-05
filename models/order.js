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
			this.belongsTo(models.Seller, { foreignKey: "seller_id" });
			this.belongsTo(models.Customer, { foreignKey: "customer_id" });
			this.hasMany(models.OrderProduct);
		}
	}
	Order.init(
		{
			status: DataTypes.INTEGER,
			total_price: DataTypes.FLOAT,
			seller_id: DataTypes.INTEGER,
			customer_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
