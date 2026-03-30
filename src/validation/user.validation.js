const { body, param, checkExact } = require("express-validator");
const ValidationUtiles = require("../utilities/ValidationUtiles");
const ENTITIES = require("../constants/entities");
const PATHS = require("../constants/paths");

const userRequirements = {
  username: body("username")
    .isLength({ min: 2 })
    .withMessage("Username must contain at least 2 symbols.")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      await ValidationUtiles.isFieldExists(
        "username",
        value,
        id,
        ENTITIES.USERS,
        PATHS.DB
      );
      return true;
    })
    .trim(),
  email: body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid.")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      await ValidationUtiles.isFieldExists(
        "email",
        value,
        id,
        ENTITIES.USERS,
        PATHS.DB
      );
      return true;
    }),
  password: body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: "6" })
    .withMessage("Password must contain at least 6 symbols."),
  age: body("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be a number between 0 and 120")
    .toInt(),
  paramsId: param("id").isUUID().withMessage("Invalid ID format."),
};

module.exports = {
  createUser: [
    userRequirements.username,
    userRequirements.email,
    userRequirements.password,
    userRequirements.age,
    checkExact([], {
      message: "Only username, email, password, and age fields are allowed.",
    }),
  ],
  getUser: [userRequirements.paramsId],
  updateUser: [
    userRequirements.paramsId,
    userRequirements.username,
    userRequirements.email,
    userRequirements.age,
    checkExact([], {
      message: "Only username, email, and age fields can be updated.",
    }),
  ],
  updatePassword: [
    userRequirements.paramsId,
    userRequirements.password,
    checkExact([], {
      message: "Only password field is allowed.",
    }),
  ],
  deleteUser: [userRequirements.paramsId],
};
