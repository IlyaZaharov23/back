const { Router } = require("express");
const serverRouter = require("./server.routes");
const userRouter = require("./user.routes");
const bookRouter = require("./book.routes");
const mainRouter = Router();

mainRouter.use(serverRouter);
mainRouter.use(userRouter);
mainRouter.use(bookRouter);

module.exports = mainRouter;
