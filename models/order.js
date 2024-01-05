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
			this.belongsTo(models.Seller);
			this.belongsTo(models.Customer);
			this.hasMany(models.OrderProduct);
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
