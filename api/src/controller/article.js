/**
 * @description Article controller
 * @author Fan Yang
 */

const { getArticleList, getArticleListByTypeId, getArticleById, addArticle, updateArticle, delArticle } = require("../services/article");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require("../model/ErrorInfo");

/**
 * Get article list
 */
async function getArticleListAction() {
  const articleInfo = await getArticleList();
  if (!articleInfo) {
    return new ErrorModel();
  }
  return new SuccessModel(articleInfo);
}


/**
 * Get article list by type id
 * @param {int} id Type id
 */
async function getArticleListByTypeIdAction(id) {
  const articleInfo = await getArticleListByTypeId(id);
  if (!articleInfo) {
    return new ErrorModel();
  }
  return new SuccessModel(articleInfo);
}

/**
 * Get article by id
 * @param {int} id 
 */
async function getArticleByIdAction(id) {
  const articleInfo = await getArticleById(id);
  if (!articleInfo) {
    return new ErrorModel();
  }
  return new SuccessModel(articleInfo);
}

/**
 * Add article
 */
async function addArticleAction({ type_id, title, article_content, introduce, addTime, view_count = 0 }) {
  try {
    const result = await addArticle({
      type_id,
      title,
      article_content,
      introduce,
      addTime,
      view_count
    });
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel();
  }
}

/**
 * update article
 */
async function updateArticleAction({ id, type_id, title, article_content, introduce, addTime, view_count = 0 }) {
  try {
    const result = await updateArticle({
      id,
      type_id,
      title,
      article_content,
      introduce,
      addTime,
      view_count
    });
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel();
  }
}

async function updateArticleViewCount(id, view_count) {
  try {
    await updateArticle({ id, view_count })
  } catch (error) {
    console.error(error)
  }

  // No need return SuccessModel or ErrorModel
}

/**
 * Delete article
 * @param {int} id 
 */
async function delArticleAction(id) {
  const result = await delArticle(id)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel()
}

module.exports = {
  getArticleListAction,
  getArticleListByTypeIdAction,
  getArticleByIdAction,
  addArticleAction,
  updateArticleAction,
  updateArticleViewCount,
  delArticleAction
};
