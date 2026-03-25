class User {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.id = data.id;
  }
}

module.exports = User;
