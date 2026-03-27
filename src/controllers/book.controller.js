const BookService = require("../services/book.service");
const {
  CONTROOLLER_ERRORS,
  ERROR_ENTITIES,
  SERVICE_ERRORS,
} = require("../constants/errors");

class BookController {
  static async getBooks(req, res) {
    try {
      const { id } = req.query;
      if (id) {
        const book = await BookService.getBookById(id);
        if (!book) {
          return res
            .status(404)
            .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.BOOK));
        }

        return res.send(JSON.stringify(book));
      }
      const books = await BookService.getBooksFromDB();
      res.send(JSON.stringify(books));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async addNewBook(req, res) {
    try {
      const newBook = await BookService.createBook(req.body);
      res.status(201).send(JSON.stringify(newBook));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedBook = await BookService.updateBookById(data, id);
      if (!updatedBook) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.BOOK));
      }
      res.send(JSON.stringify(updatedBook));
    } catch (error) {
      if (error.message === SERVICE_ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.BOOK));
      }
      res.status(500).send(error.message);
    }
  }

  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const bookId = await BookService.removeBookById(id);
      if (!bookId) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.BOOK));
      }
      res.send(JSON.stringify(bookId));
    } catch (error) {
      if (error.message === SERVICE_ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.BOOK));
      }
      res.status(500).send(error.message);
    }
  }
}

module.exports = BookController;
