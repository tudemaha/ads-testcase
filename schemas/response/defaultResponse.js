class Response {
	static defaultOK(message, data) {
		const res = {
			success: true,
			status: 200,
			message,
			data,
			error: {},
		};
		return res;
	}

	static defaultCreated(message, data) {
		const res = {
			success: true,
			status: 201,
			message,
			data,
			error: {},
		};
		return res;
	}

	static defaultBadRequest(error) {
		const res = {
			success: false,
			status: 400,
			message: "Request body or parameters not match",
			data: {},
			error: error ?? {},
		};
		return res;
	}

	static defaultUnauthorized(error) {
		const res = {
			success: false,
			status: 401,
			message: "Unauthorized access",
			data: {},
			error: error ?? {},
		};
		return res;
	}

	static defaultForbidden(error) {
		const res = {
			success: false,
			status: 403,
			message: "Forbidden access",
			data: {},
			error: error ?? {},
		};
		return res;
	}

	static defaultNotFound(error) {
		const res = {
			success: false,
			status: 404,
			message: "Record not found",
			data: {},
			error: error ?? {},
		};
		return res;
	}

	static defaultConflict(error) {
		const res = {
			success: false,
			status: 409,
			message: "New data already exists",
			data: {},
			error: error ?? {},
		};
		return res;
	}

	static defaultInternalError(error) {
		const res = {
			success: false,
			status: 500,
			message: "Request failed, server error",
			data: {},
			error: error ?? {},
		};
		return res;
	}
}

module.exports = Response;
