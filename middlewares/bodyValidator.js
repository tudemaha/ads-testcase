const { defaultBadRequest } = require("./../schemas/response/defaultResponse");

const validate = (schema) => {
	return (req, res, next) => {
		const err = schema.validate(req.body, { abortEarly: false });
		if (err !== undefined) {
			const validationError = err.error.details.map((error) => error.message);
			const response = defaultBadRequest({ validationError });
			return res.status(response.status).json(response);
		}

		return next();
	};
};

module.exports = validate;
