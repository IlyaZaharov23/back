const FileHelpers = require("../helpers/FileHelpers");
const ENTITIES = require("../constants/entities");
const PATHS = require("../constants/paths");
const { SERVICE_ERRORS } = require("../constants/errors");

class UserService {
  static async getUsersFromDB() {
    try {
      const users = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.USERS
      );
      return users;
    } catch (error) {
      return [];
    }
  }
  static async getUserById(id) {
    try {
      const users = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.USERS
      );
      const targetUser = users.find((user) => user.id === id);
      if (!targetUser) {
        throw new Error(SERVICE_ERRORS.NOT_FOUND);
      }
      return targetUser;
    } catch (error) {
      throw error;
    }
  }
  static async createUser(data) {
    try {
      const users = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.USERS
      );
      users.push(data);
      await FileHelpers.updateEntityFromDB(users, PATHS.DB, ENTITIES.USERS);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById(data, id) {
    try {
      const users = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.USERS
      );
      const targetUserIndex = users.findIndex((user) => user.id === id);
      if (targetUserIndex === -1) {
        throw new Error(SERVICE_ERRORS.NOT_FOUND);
      }
      const { id: _, ...allowedData } = data;
      const updatedUser = { ...users[targetUserIndex], ...allowedData };
      users[targetUserIndex] = updatedUser;
      await FileHelpers.updateEntityFromDB(users, PATHS.DB, ENTITIES.USERS);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  static async updateUserPasswordById(password, id) {
    try {
      const users = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.USERS
      );
      const targetUserIndex = users.findIndex((user) => user.id === id);
      if (!password) {
        throw new Error(SERVICE_ERRORS.REQUIRED);
      }
      if (targetUserIndex === -1) {
        throw new Error(SERVICE_ERRORS.NOT_FOUND);
      }
      users[targetUserIndex].password = password;
      await FileHelpers.updateEntityFromDB(users, PATHS.DB, ENTITIES.USERS);
      return users[targetUserIndex];
    } catch (error) {
      throw error;
    }
  }
  static async removeUserById(id) {
    try {
      const users = await FileHelpers.readEntityFromDB(
        PATHS.DB,
        ENTITIES.USERS
      );
      const targetUserIndex = users.findIndex((user) => user.id === id);
      if (targetUserIndex === -1) {
        throw new Error(SERVICE_ERRORS.NOT_FOUND);
      }
      users.splice(targetUserIndex, 1);
      await FileHelpers.updateEntityFromDB(users, PATHS.DB, ENTITIES.USERS);
      return id;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
