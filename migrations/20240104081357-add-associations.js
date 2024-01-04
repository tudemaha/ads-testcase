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
		await queryInterface.addColumn("Accounts", "role_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Roles",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Sellers", "account_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Accounts",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Customers", "account_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Accounts",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Orders", "seller_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Sellers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Orders", "customer_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Customers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("OrderProducts", "order_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Orders",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("OrderProducts", "product_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Products",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});

		await queryInterface.addColumn("Products", "seller_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Sellers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("Carts", "customer_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Customers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("Carts", "product_id", {
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
		await queryInterface.removeColumn("Accounts", "role_id");
		await queryInterface.removeColumn("Sellers", "account_id");
		await queryInterface.removeColumn("Customers", "account_id");
		await queryInterface.removeColumn("Orders", "seller_id");
		await queryInterface.removeColumn("Orders", "customer_id");
		await queryInterface.removeColumn("OrderProducts", "order_id");
		await queryInterface.removeColumn("OrderProducts", "product_id");
		await queryInterface.removeColumn("Products", "seller_id");
		await queryInterface.removeColumn("Carts", "customer_id");
		await queryInterface.removeColumn("Carts", "product_id");
	},
};
