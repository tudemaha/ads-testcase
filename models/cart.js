"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Cart.belongsTo(models.Customer, { foreignKey: "customer_id" });
			Cart.belongsTo(models.Product, { foreignKey: "product_id" });
		}
	}
	Cart.init(
		{
			quantity: DataTypes.INTEGER,
			note: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Cart",
		}
	);
	return Cart;
};
