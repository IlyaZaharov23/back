const fsPromises = require("fs/promises");

class FileHelpers {
  static async readEntityFromDB(path, entityName) {
    try {
      const dbData = await fsPromises.readFile(path, "utf-8");
      const parsedData = JSON.parse(dbData);
      return parsedData[entityName] || [];
    } catch (error) {
      return [];
    }
  }
  static async updateEntityFromDB(data, path, entityName) {
    try {
      const dbData = await fsPromises.readFile(path, "utf-8");
      const parsedData = JSON.parse(dbData);
      parsedData[entityName] = data;
      await fsPromises.writeFile(path, JSON.stringify(parsedData));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FileHelpers;
