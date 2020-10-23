/**
 * @description Advertisement controller
 * @author Fan Yang
 */

const { getAdvertisementList } = require("../services/advertisement");
const { SuccessModel, ErrorModel } = require("../model/ResModel");

/**
 * Get advertisement list
 */
async function getAdvertisementListAction() {
  const advertisementList = await getAdvertisementList();
  if (!advertisementList) {
    return new ErrorModel();
  }
  return new SuccessModel(advertisementList);
}

module.exports = {
  getAdvertisementListAction,
};
