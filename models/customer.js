"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Customer extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Customer.belongsTo(models.Account, { foreignKey: "account_id" });
			Customer.hasMany(models.Order);
			Customer.hasMany(models.Cart);
		}
	}
	Customer.init(
		{
			name: DataTypes.STRING,
			phone: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Customer",
		}
	);
	return Customer;
};
