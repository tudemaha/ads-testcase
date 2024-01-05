const { defaultBadRequest } = require("./../schemas/response/defaultResponse");

const validate = (schema) => {
	return (req, res, next) => {
		const err = schema.validate(req.body, { abortEarly: false }).error;
		if (err !== undefined) {
			const validationError = err.details.map((error) => error.message);
			const response = defaultBadRequest({ validation_error: validationError });
			return res.status(response.status).json(response);
		}

		return next();
	};
};

module.exports = validate;
