const CONTROOLLER_ERRORS = {
  NOT_FOUND: (entity) => `${entity} not found.`,
  REQUIRED: (field) => `${field} is required.`,
};

const SERVICE_ERRORS = {
  NOT_FOUND: "NotFound",
  REQUIRED: "Required",
};

const ERROR_ENTITIES = {
  USER: "User",
  BOOK: "Book",
  PASSWORD: "Password",
};

module.exports = { CONTROOLLER_ERRORS, SERVICE_ERRORS, ERROR_ENTITIES };
