const { Router } = require("express");
const { createToken, verifyToken } = require("../middlewares/jwt");

const accountRouter = Router();

accountRouter.post("/register/seller", verifyToken(2));

module.exports = accountRouter;
