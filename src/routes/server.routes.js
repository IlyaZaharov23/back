const { Router } = require("express");
const ServerController = require("../controllers/server.controller");

const serverRouter = Router();

serverRouter.get("/hello", ServerController.greeting);

serverRouter.post("/echo", ServerController.sendMessage);

module.exports = serverRouter;
