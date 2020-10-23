/**
 * @description User data model
 * @author Fan Yang
 */

const seq = require("../seq");
const { STRING } = require("../types");

// users
const User = seq.define("user", {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: "Username, unique",
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: "Password",
  },
  avatar: {
    type: String,
    comment: "Avatar url",
  }
});

module.exports = User;
