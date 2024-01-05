"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Account extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Role, { foreignKey: "role_id" });
			this.hasOne(models.Customer);
			this.hasOne(models.Seller);
		}
	}
	Account.init(
		{
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: DataTypes.STRING,
			role_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Account",
		}
	);
	return Account;
};
