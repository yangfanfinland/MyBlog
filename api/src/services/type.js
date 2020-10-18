/**
 * @description Type service
 * @author Fan Yang
 */

const { Type } = require("../db/model/index");

/**
 * Get type list
 */
async function getTypeList() {
  const result = await Type.findAll({
    attributes: ["id", "typeName", "orderNum", "icon"],
  });
  if (result == null) {
    return result;
  }

  return result.map(type => type.dataValues);
}

module.exports = {
  getTypeList,
};
