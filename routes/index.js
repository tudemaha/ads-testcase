const accountRouter = require("./accountRoutes");
const cartRouter = require("./cartRoutes");
const orderRouter = require("./orderRoutes");
const productRouter = require("./productRoutes");

module.exports = (app) => {
	app.use("/auth", accountRouter);
	app.use("/products", productRouter);
	app.use("/carts", cartRouter);
	app.use("/orders", orderRouter);
	return app;
};
