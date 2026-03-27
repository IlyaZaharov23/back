const FileHelpers = require("../helpers/FileHelpers");
const ENTITIES = require("../constants/entities");
const PATHS = require("../constants/paths");
const { SERVICE_ERRORS } = require("../constants/errors");

class BookService {
  static async getBooksFromDB() {
    try {
      const books = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.BOOKS
      );
      return books;
    } catch (error) {
      return [];
    }
  }
  static async getBookById(id) {
    try {
      const books = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.BOOKS
      );
      const targetBook = books.find((book) => book.id === id);
      return targetBook;
    } catch (error) {
      throw error;
    }
  }
  static async createBook(data) {
    try {
      const books = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.BOOKS
      );
      books.push(data);
      await FileHelpers.updateEntityFromDB(books, PATHS.DB, ENTITIES.BOOKS);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async updateBookById(data, id) {
    try {
      const books = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.BOOKS
      );
      const targetBookIndex = books.findIndex((book) => book.id === id);
      if (targetBookIndex === -1) {
        throw new Error(SERVICE_ERRORS.NOT_FOUND);
      }
      const { id: _, ...allowedData } = data;
      const updatedBook = { ...books[targetBookIndex], ...allowedData };
      books[targetBookIndex] = updatedBook;
      await FileHelpers.updateEntityFromDB(books, PATHS.DB, ENTITIES.BOOKS);
      return updatedBook;
    } catch (error) {
      throw error;
    }
  }
  static async removeBookById(id) {
    try {
      const books = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.BOOKS
      );
      const targetBookIndex = books.findIndex((book) => book.id === id);
      if (targetBookIndex === -1) {
        throw new Error(SERVICE_ERRORS.NOT_FOUND);
      }
      books.splice(targetBookIndex, 1);
      await FileHelpers.updateEntityFromDB(books, PATHS.DB, ENTITIES.BOOKS);
      return targetBook.id;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookService;
