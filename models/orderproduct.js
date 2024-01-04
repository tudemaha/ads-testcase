"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrderProduct extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			OrderProduct.belongsTo(models.Order, { foreignKey: "order_id" });
			OrderProduct.belongsTo(models.Product, { foreignKey: "product_id" });
		}
	}
	OrderProduct.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			price: DataTypes.FLOAT,
			quantity: DataTypes.INTEGER,
			quantity_price: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "OrderProduct",
		}
	);
	return OrderProduct;
};
