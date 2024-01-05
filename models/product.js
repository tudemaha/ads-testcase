"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Product.hasMany(models.OrderProduct);
			Product.belongsTo(models.Seller, { foreignKey: "seller_id" });
			Product.hasMany(models.Cart);
		}
	}
	Product.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			stock: DataTypes.INTEGER,
			price: DataTypes.FLOAT,
			seller_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
