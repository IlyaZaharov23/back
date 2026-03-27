const BookController = require("../controllers/book.controller");
const { Router } = require("express");

const bookRouter = Router();

bookRouter
  .route("/books")
  .get(BookController.getBooks)
  .post(BookController.addNewBook);

bookRouter
  .route("/books/:id")
  .put(BookController.updateBook)
  .delete(BookController.deleteBook);

module.exports = bookRouter;
