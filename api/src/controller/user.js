/**
 * @description User controller
 * @author Fan Yang
 */

const { getUserInfo, createUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require("../model/ErrorInfo");
const doCrypto = require("../utils/cryp");

/**
 * User register
 * @param {string} userName Username
 * @param {string} password User password
 * @param {string} avatar User avatar
 */
async function registerAction({ userName, password, avatar }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // Username exits
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      avatar
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * Get user info
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 */
async function getUserInfoAction(ctx, userName) {
  const userInfo = await getUserInfo(userName);
  if (!userInfo) {
    return new ErrorModel();
  }
  return new SuccessModel(userInfo);
}

/**
 * User login
 * @param {Object} ctx koa2 ctx
 * @param {string} userName Username
 * @param {string} password User pasword
 */
async function loginAction(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }

  // Save user info into session once login success
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

/**
 * Logout
 * @param {Object} ctx ctx
 */
async function logoutAction(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  registerAction,
  loginAction,
  logoutAction,
  getUserInfoAction
};
