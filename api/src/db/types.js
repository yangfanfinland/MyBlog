/**
 * @description Encapsulation sequelize model types
 * @author Fan Yang
 */

const Sequelize = require("sequelize");

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
  DATE: Sequelize.DATE
};
