class CustomerRepository {
	constructor(customerModel) {
		this.customerModel = customerModel;
	}

	async create(customerData, transaction) {
		const options = transaction ? { transaction } : {};
		try {
			const customer = await this.customerModel.create(customerData, options);
			return customer;
		} catch (error) {
			return new Error(`Failed to add customer: ${error.message}`);
		}
	}

	async get(id) {
		try {
			const customer = await this.customerModel.findOne({
				where: {
					id,
				},
			});
			return customer;
		} catch (error) {
			return new Error(`Failed to get customer: ${error.message}`);
		}
	}
}

module.exports = CustomerRepository;
