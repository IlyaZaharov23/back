const UserService = require("../services/user.service");
const {
  ERROR_ENTITIES,
  CONTROOLLER_ERRORS,
  SERVICE_ERRORS,
} = require("../constants/errors");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getUsersFromDB();
      res.send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async addNewUser(req, res) {
    try {
      const newUsers = await UserService.createUser(req.body);
      res.status(201).send(JSON.stringify(newUsers));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.send(JSON.stringify(user));
    } catch (error) {
      if (error.message === SERVICE_ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.USER));
      }
      res.status(500).send(JSON.stringify(error.message));
    }
  }
  static async updateUser(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;
      const updatedUser = await UserService.updateUserById(data, id);
      res.send(JSON.stringify(updatedUser));
    } catch (error) {
      if (error.message === SERVICE_ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.USER));
      }
      res.status(500).send(JSON.stringify(error.message));
    }
  }
  static async changeUserPassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const updatedUser = await UserService.updateUserPasswordById(
        password,
        id
      );
      res.send(JSON.stringify(updatedUser));
    } catch (error) {
      if (error.message === SERVICE_ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.USER));
      } else if (error.message === SERVICE_ERRORS.REQUIRED) {
        return res
          .status(400)
          .send(CONTROOLLER_ERRORS.REQUIRED(ERROR_ENTITIES.PASSWORD));
      }
      res.status(500).send(JSON.stringify(error.message));
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const userId = await UserService.removeUserById(id);
      res.send(JSON.stringify(userId));
    } catch (error) {
      if (error.message === SERVICE_ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(CONTROOLLER_ERRORS.NOT_FOUND(ERROR_ENTITIES.USER));
      }
      res.status(500).send(JSON.stringify(error.message));
    }
  }
}

module.exports = UserController;
