const User = require("../models/user.schema");

const users = [];

class UserController {
  static getAllUsers(req, res) {
    res.send(JSON.stringify(users));
  }
  static addNewUser(req, res) {
    const newUser = new User(req.body);
    users.push(newUser);
    res.send(JSON.stringify(newUser));
  }
  static getUser(req, res) {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.send(JSON.stringify("User not found."));
    }
    res.send(JSON.stringify(user));
  }
  static changeUser(req, res) {
    const data = req.body;
    const { id } = req.params;
    const targetUserIndex = users.findIndex((user) => user.id === id);
    if (targetUserIndex === -1) {
      return res.send(JSON.stringify("User not found."));
    }
    const updatedUser = new User({ id, ...data });
    users[targetUserIndex] = updatedUser;
    res.send(JSON.stringify(updatedUser));
  }
  static changeUserPassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;
    const targetUserIndex = users.findIndex((user) => user.id === id);
    if (targetUserIndex === -1) {
      return res.send(JSON.stringify("User not found."));
    }
    if (!password) {
      return res.send(JSON.stringify("Password is required."));
    }
    users[targetUserIndex].password = password;
    res.send(JSON.stringify(id));
  }
  static deleteUser(req, res) {
    const { id } = req.params;
    const targetUserIndex = users.findIndex((user) => user.id === id);
    if (targetUserIndex === -1) {
      return res.send(JSON.stringify("User not found."));
    }
    users.splice(targetUserIndex, 1);
    res.send(JSON.stringify(id));
  }
}

module.exports = UserController;
