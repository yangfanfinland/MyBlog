/**
 * @description Advertisement service
 * @author Fan Yang
 */

const { Advertisement } = require("../db/model/index");

/**
 * Get advertisement list
 */
async function getAdvertisementList() {
  const result = await Advertisement.findAll({});
  if (result == null) {
    return result;
  }
  return result.map((ad) => ad.dataValues);
}

module.exports = {
  getAdvertisementList,
};
