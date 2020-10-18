/**
 * @description Article type data model
 * @author Fan Yang
 */

const seq = require("../seq");
const { STRING, INTEGER } = require("../types");

// types
const Type = seq.define("type", {
  typeName: {
    type: STRING,
    allowNull: false
  },
  orderNum: {
    type: INTEGER,
    allowNull: false
  },
  icon: {
    type: STRING,
    allowNull: false
  }
});

module.exports = Type;