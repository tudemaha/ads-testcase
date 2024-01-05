const accountRouter = require("./accountRoutes");
const productRouter = require("./productRoutes");

module.exports = (app) => {
	app.use("/auth", accountRouter);
	app.use("/products", productRouter);
	return app;
};
