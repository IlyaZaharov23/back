class ServerController {
  static greeting(req, res) {
    res.send("Привет, Redev!");
  }
  static sendMessage(req, res) {
    const { message } = req.body;
    res.send(JSON.stringify(message));
  }
}

module.exports = ServerController;
