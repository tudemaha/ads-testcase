class SellerRepository {
	constructor(sellerModel) {
		this.sellerModel = sellerModel;
	}

	async create(sellerData, transaction) {
		const options = transaction ? { transaction } : {};
		try {
			const seller = await this.sellerModel.create(sellerData, options);
			return seller;
		} catch (error) {
			return new Error(`Failed to add seller: ${error.message}`);
		}
	}

	async getById(id) {
		try {
			const seller = await this.sellerModel.findOne({
				where: {
					id,
				},
			});
			return seller;
		} catch (error) {
			return new Error(`Failed to get seller: ${error.message}`);
		}
	}

	async getByAccountId(AccountId) {
		try {
			const seller = await this.sellerModel.findOne({
				where: {
					AccountId,
				},
			});
			return seller;
		} catch (error) {
			return new Error(`Failed to get seller: ${error.message}`);
		}
	}
}

module.exports = SellerRepository;
