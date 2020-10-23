/**
 * @description Socail account data model
 * @author Fan Yang
 */

const seq = require("../seq");
const { STRING } = require("../types");

// socialAccounts
const SocialAccount = seq.define("socialAccount", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: "Name, unique",
  },
  url: {
    type: STRING,
    allowNull: false,
    comment: "Url, unique",
  },
  icon: {
    type: STRING,
    allowNull: false,
    comment: "Icon",
  }
});

module.exports = SocialAccount;
