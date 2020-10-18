/**
 * @description Type controller
 * @author Fan Yang
 */

const { getTypeList } = require("../services/type");
const { SuccessModel, ErrorModel } = require("../model/ResModel");

/**
 * Get article type list
 */
async function getArticleTypeListAction() {
  const typeInfo = await getTypeList();
  if (!typeInfo) {
    return new ErrorModel();
  }
  return new SuccessModel(typeInfo);
}

module.exports = {
  getArticleTypeListAction,
};
