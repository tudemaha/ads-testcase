module.exports = {
	development: {
		username: process.env.DEV_DB_USER,
		password: process.env.DEV_DB_PASS,
		database: process.env.DEV_DB_NAME,
		host: process.env.DEV_DB_HOST,
		port: process.env.DEV_DB_PORT,
		dialect: "mysql",
	},

	production: {
		username: process.env.PROD_DB_USER,
		password: process.env.PROD_DB_PASS,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOST,
		port: process.env.PROD_DB_PORT,
		dialect: "mysql",
	},
};
