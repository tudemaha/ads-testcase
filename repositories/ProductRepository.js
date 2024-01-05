const { Op } = require("sequelize");
const { Seller } = require("./../models");

class ProductRepository {
	constructor(productModel) {
		this.productModel = productModel;
	}

	async create(productData) {
		try {
			const product = await this.productModel.create(productData);
			return product;
		} catch (error) {
			return new Error(`Failed to add product: ${error.message}`);
		}
	}

	async getByQuery(sellerQuery, nameQuery) {
		const where = {};
		if (nameQuery) {
			where.name = {
				[Op.like]: `%${nameQuery}%`,
			};
		}
		let sellerWhere = {};
		if (sellerQuery) {
			sellerWhere.name = {
				[Op.like]: `%${sellerQuery}%`,
			};
		}

		try {
			const products = await this.productModel.findAll({
				where,
				include: {
					model: Seller,
					where: sellerWhere,
					attributes: ["name"],
				},
			});
			return products;
		} catch (error) {
			return new Error(`Failed to get product: ${error.message}`);
		}
	}

	async getBySellerId(SellerId) {
		try {
			const products = await this.productModel.findAll({
				where: {
					SellerId,
				},
			});
			return products;
		} catch (error) {
			return new Error(`Failed to get product: ${error.message}`);
		}
	}

	async getById(id) {
		try {
			const product = await this.productModel.findOne({
				where: { id },
				include: {
					model: Seller,
					attributes: ["name", "address", "id"],
				},
			});
			return product;
		} catch (error) {
			return new Error(`Failed to get product: ${error.message}`);
		}
	}

	async updateProduct(id, newProductData) {
		const product = await this.getProductById(id);
		if (product instanceof Error) {
			return new Error(product.message);
		}

		product.name = newProductData.name;
		product.description = newProductData.description;
		product.price = newProductData.price;
		product.stock = newProductData.stock;

		try {
			await product.save();
			return product;
		} catch (error) {
			return new Error(`Failed to update product: ${error.message}`);
		}
	}

	async updateStock(ProductId, minStock) {
		const product = await this.getProductById(ProductId);
		if (product instanceof Error) {
			return new Error(product.message);
		}

		product.stock -= minStock;

		try {
			await product.save();
			return product;
		} catch (error) {
			return new Error(`Failed to update stock: ${error.message}`);
		}
	}

	async delete(id) {
		try {
			const product = await this.productModel.destroy({
				where: { id },
			});
			return product;
		} catch (error) {
			return new Error(`Failed to delete product: ${error.message}`);
		}
	}
}

module.exports = ProductRepository;
