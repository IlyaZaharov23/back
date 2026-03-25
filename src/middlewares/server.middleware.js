class ServerMiddleware {
  static logger(req, res, next) {
    console.log("----common-middleware----");
    next();
  }
}

module.exports = ServerMiddleware;
