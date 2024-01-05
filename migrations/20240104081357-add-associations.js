"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn("Accounts", "RoleId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Roles",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Sellers", "AccountId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Accounts",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Customers", "AccountId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Accounts",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Orders", "SellerId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Sellers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Orders", "CustomerId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Customers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("OrderProducts", "OrderId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Orders",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("OrderProducts", "ProductId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Products",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Products", "SellerId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Sellers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("Carts", "CustomerId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Customers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("Carts", "ProductId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Products",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn("Accounts", "RoleId");
		await queryInterface.removeColumn("Sellers", "AccountId");
		await queryInterface.removeColumn("Customers", "AccountId");
		await queryInterface.removeColumn("Orders", "SellerId");
		await queryInterface.removeColumn("Orders", "CustomerId");
		await queryInterface.removeColumn("OrderProducts", "OrderId");
		await queryInterface.removeColumn("OrderProducts", "ProductId");
		await queryInterface.removeColumn("Products", "SellerId");
		await queryInterface.removeColumn("Carts", "CustomerId");
		await queryInterface.removeColumn("Carts", "ProductId");
	},
};
