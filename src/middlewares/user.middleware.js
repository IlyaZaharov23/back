class UserMiddleware {
  static withoutIdMiddleware(req, res, next) {
    if (req.body) {
      console.log(req.body);
    } else {
      console.log("----get_users----");
    }
    next();
  }
  static withIdMiddleware(req, res, next) {
    console.log(req.params.id);
    next();
  }
}

module.exports = UserMiddleware;
