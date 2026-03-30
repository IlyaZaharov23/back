const UserMiddleware = require("../middlewares/user.middleware");
const UserController = require("../controllers/user.controller");
const ValidationUtiles = require("../utilities/ValidationUtiles");
const { Router } = require("express");
const userValidator = require("../validation/user.validation");

const userRouter = Router();

userRouter
  .route("/users")
  .all(UserMiddleware.withoutIdMiddleware)
  .get(UserController.getAllUsers)
  .post(
    userValidator.createUser,
    ValidationUtiles.checkValidation,
    UserController.addNewUser
  );

userRouter
  .route("/users/:id")
  .all(UserMiddleware.withIdMiddleware)
  .get(
    userValidator.getUser,
    ValidationUtiles.checkValidation,
    UserController.getUser
  )
  .put(
    userValidator.updateUser,
    ValidationUtiles.checkValidation,
    UserController.updateUser
  )
  .patch(
    userValidator.updatePassword,
    ValidationUtiles.checkValidation,
    UserController.changeUserPassword
  )
  .delete(
    userValidator.deleteUser,
    ValidationUtiles.checkValidation,
    UserController.deleteUser
  );

module.exports = userRouter;
