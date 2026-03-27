const UserMiddleware = require("../middlewares/user.middleware");
const UserController = require("../controllers/user.controller");
const { Router } = require("express");

const userRouter = Router();

userRouter
  .route('/users')
  .all(UserMiddleware.withoutIdMiddleware)
  .get(UserController.getAllUsers)
  .post(UserController.addNewUser);

userRouter
  .route('/users/:id')
  .all(UserMiddleware.withIdMiddleware)
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .patch(UserController.changeUserPassword)
  .delete(UserController.deleteUser);

module.exports = userRouter;
