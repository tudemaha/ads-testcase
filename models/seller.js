"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Seller extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Seller.belongsTo(models.Account, { foreignKey: "account_id" });
			Seller.hasMany(models.Order);
			Seller.hasMany(models.Product);
		}
	}
	Seller.init(
		{
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			phone: DataTypes.STRING,
			account_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Seller",
		}
	);
	return Seller;
};
