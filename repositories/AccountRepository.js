class AccountRepository {
	constructor(accountModel) {
		this.accountModel = accountModel;
	}

	async create(accountData, transaction) {
		const options = transaction ? { transaction } : {};
		try {
			const account = await this.accountModel.create(accountData, options);
			return account;
		} catch (error) {
			return new Error(`Failed to create account: ${error.message}`);
		}
	}

	async get(email) {
		try {
			const account = await this.accountModel.findOne({
				where: {
					email,
				},
			});
			return account;
		} catch (error) {
			return new Error(`Failed to get account: ${error.message}`);
		}
	}
}

module.exports = AccountRepository;
