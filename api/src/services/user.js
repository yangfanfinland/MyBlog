/**
 * @description User service
 * @author Fan Yang
 */

const { User } = require("../db/model/index");
const { SocialAccount } = require("../db/model/index");

/**
 * Get user info
 * @param {string} userName
 * @param {string} password
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName,
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }

  const result = await User.findOne({
    attributes: ["id", "userName", "avatar"],
    where: whereOpt,
    include: [
      {
        model: SocialAccount,
        attributes: ['name', 'url', 'icon']
      },
    ],
  });
  if (result == null) {
    return result;
  }

  return result.dataValues;
}

/**
 * Create user
 * @param {string} userName Username
 * @param {string} password User password
 */
async function createUser({ userName, password, avatar }) {
  const result = await User.create({
    userName,
    password,
    avatar
  });
  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser,
};
