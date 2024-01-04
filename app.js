require("dotenv").config();
const { app, server } = require("./pkg/server");
const router = require("./routes/index");

const injectedApp = router(app);
server(injectedApp);
