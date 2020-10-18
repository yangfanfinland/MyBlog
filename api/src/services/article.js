/**
 * @description Article service
 * @author Fan Yang
 */

const { Article } = require("../db/model/index");
const { Type } = require("../db/model/index");

/**
 * Get article list
 */
async function getArticleList() {
  const result = await Article.findAll({
    include: [
      {
        model: Type,
        attributes: ["typeName", "orderNum", "icon"],
      },
    ],
  });
  if (result == null) {
    return result;
  }
  return result.map((article) => article.dataValues);
}

/**
 * Get article list by type Id
 * @param {int} id 
 */
async function getArticleListByTypeId(id) {
  const result = await Article.findAll({
    where: {
      type_id: id
    },
    include: [
      {
        model: Type,
        attributes: ["typeName", "orderNum", "icon"],
      },
    ],
  });
  if (result == null) {
    return result;
  }
  return result.map((article) => article.dataValues);
}

/**
 * Get article by id
 */
async function getArticleById(id) {
  const result = await Article.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Type,
        attributes: ["typeName", "orderNum", "icon"],
      },
    ],
  });
  if (result == null) {
    return result;
  }
  return result.dataValues;
}

/**
 * Add article
 */
async function addArticle({
  type_id,
  title,
  article_content,
  introduce,
  view_count,
  addTime,
}) {
  const result = await Article.create({
    type_id,
    title,
    article_content,
    introduce,
    view_count,
    addTime,
  });
  return result.dataValues;
}

/**
 * update article
 */
async function updateArticle({
  id,
  type_id,
  title,
  article_content,
  introduce,
  view_count,
  addTime,
}) {
  const result = await Article.update({
    id,
    type_id,
    title,
    article_content,
    introduce,
    view_count,
    addTime,
  }, {
    where: {
      id: id
    }
  });
  return result;
}

/**
 * Delete article
 * @param {int} id
 */
async function delArticle(id) {
  const result = await Article.destroy({
    where: {
      id: id,
    },
  });
  return result > 0;
}

module.exports = {
  getArticleList,
  getArticleListByTypeId,
  getArticleById,
  addArticle,
  updateArticle,
  delArticle,
};
