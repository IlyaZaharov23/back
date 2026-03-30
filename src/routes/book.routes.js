const { Router } = require("express");
const bookValidator = require("../validation/book.validation");
const ValitationUtiles = require("../utilities/ValidationUtiles");
const BookController = require("../controllers/book.controller");

const bookRouter = Router();

bookRouter
  .route("/books")
  .get(
    bookValidator.getBook,
    ValitationUtiles.checkValidation,
    BookController.getBooks
  )
  .post(
    bookValidator.createBook,
    ValitationUtiles.checkValidation,
    BookController.addNewBook
  );

bookRouter
  .route("/books/:id")
  .put(
    bookValidator.updateBook,
    ValitationUtiles.checkValidation,
    BookController.updateBook
  )
  .delete(
    bookValidator.deleteBook,
    ValitationUtiles.checkValidation,
    BookController.deleteBook
  );

module.exports = bookRouter;
