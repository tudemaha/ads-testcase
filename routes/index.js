const accountRoutes = require("./accountRoutes");

module.exports = (app) => {
	app.use("/auth", accountRoutes);
	return app;
};
