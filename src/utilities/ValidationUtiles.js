const { validationResult } = require("express-validator");
const FileHelpers = require("../helpers/FileHelpers");
const PATHS = require("../constants/paths");

class ValidationUtiles {
  static checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      const idError = errorsArray.find(
        (error) => error.path === "id" && error.location === "params"
      );
      if (idError) {
        return res.status(400).send([idError]);
      }
      return res.status(400).send(errors.array());
    }
    next();
  }
  static async isFieldExists(field, value, id, entityName, entityPath) {
    const entity = await FileHelpers.readEntityFromDB(entityPath, entityName);
    const existedEntityItem = entity.find(
      (entityItem) => entityItem[field] === value
    );

    if (existedEntityItem && existedEntityItem.id !== id) {
      throw new Error(`${field} already exists.`);
    }
  }
}

module.exports = ValidationUtiles;
