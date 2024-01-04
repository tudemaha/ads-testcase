const { Op } = require("sequelize");
class ProductRepository {
	constructor(productModel) {
		this.productModel = productModel;
	}

	product = Product(sequelize, DataTypes);

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
		const include = {};
		if (sellerQuery) {
			include.model = "Seller";
			include.where.name = {
				[Op.like]: `%${sellerQuery}%`,
			};
		}

		try {
			const products = await this.productModel.findAll({
				where,
				include,
			});
			return products;
		} catch (error) {
			return new Error(`Failed to get product: ${error.message}`);
		}
	}

	async getBySellerId(sellerId) {
		try {
			const products = await this.productModel.findAll({
				where: {
					seller_id: sellerId,
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
			});
			return product;
		} catch (error) {
			return new Error(`Failed to get product: ${error.message}`);
		}
	}

	async update(id, newProductData) {
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
