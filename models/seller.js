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
			this.belongsTo(models.Account);
			this.hasMany(models.Order);
			this.hasMany(models.Product);
		}
	}
	Seller.init(
		{
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			phone: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Seller",
		}
	);
	return Seller;
};
