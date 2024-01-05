const accountRouter = require("./accountRoutes");
const cartRouter = require("./cartRoutes");
const productRouter = require("./productRoutes");

module.exports = (app) => {
	app.use("/auth", accountRouter);
	app.use("/products", productRouter);
	app.use("/carts", cartRouter);
	return app;
};
