/**
 * @description Advertisement data model
 * @author Fan Yang
 */

const seq = require("../seq");
const { STRING } = require("../types");

// advertisements
const Advertisement = seq.define("advertisement", {
  title: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: "title, unique",
  },
  introduction: {
    type: STRING,
    comment: "Introduction",
  },
  url: {
    type: STRING,
    allowNull: false,
    comment: "Url",
  },
  picture: {
    type: STRING,
    comment: "Picture url",
  }
});

module.exports = Advertisement;