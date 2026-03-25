const express = require("express");
const app = express();
const ServerMiddleware = require("./middlewares/server.middleware");
const mainRouter = require("./routes");
require("dotenv").config();

const PORT = process.env.DEV_PORT;

app.use(express.json());
app.use(ServerMiddleware.logger);
app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});
