const { body, param, query, checkExact } = require("express-validator");
const ValidationUtiles = require("../utilities/ValidationUtiles");
const ENTITIES = require("../constants/entities");
const PATHS = require("../constants/paths");

const bookRequirements = {
  title: body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      await ValidationUtiles.isFieldExists(
        "title",
        value,
        id,
        ENTITIES.BOOKS,
        PATHS.DB
      );
    })
    .trim(),
  author: body("author")
    .notEmpty()
    .withMessage("Author name is required.")
    .trim(),
  genre: body("genre").notEmpty().withMessage("Genre is required.").trim(),
  paramId: param("id").isUUID().withMessage("Invalid ID param."),
  queryId: query("id").optional().isUUID().withMessage("Invalid ID param."),
};

module.exports = {
  getBook: [bookRequirements.queryId],
  createBook: [
    bookRequirements.title,
    bookRequirements.author,
    bookRequirements.genre,
    checkExact([], { message: "Only title, author and genre fields allowed." }),
  ],
  updateBook: [
    bookRequirements.paramId,
    bookRequirements.title,
    bookRequirements.author,
    bookRequirements.genre,
  ],
  deleteBook: [bookRequirements.paramId],
};
