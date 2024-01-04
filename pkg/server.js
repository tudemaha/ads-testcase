const express = require("express");

const app = express();
app.use(express.json());

const server = (appInject) => {
	appInject.listen(process.env.PORT || 8080);
};

module.exports = { app, server };
