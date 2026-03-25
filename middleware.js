const commonLogger = (req, res, next) => {
  console.log("----common-middleware----");
  next();
};

const withoutIdMiddleware = (req, res, next) => {
  if (req.body) {
    console.log(req.body);
  } else {
    console.log("----get_users----");
  }
  next()
};

const withIdMiddleware = (req, res, next) => {
  console.log(req.params.id);
  next();
};

module.exports = { commonLogger, withoutIdMiddleware, withIdMiddleware };
