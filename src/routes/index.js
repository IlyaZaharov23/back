const { Router } = require("express");
const serverRouter = require("./server.routes");
const userRouter = require("./user.routes");
const mainRouter = Router();

mainRouter.use(serverRouter);
mainRouter.use(userRouter);

module.exports = mainRouter;
