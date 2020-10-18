/**
 * @description Article admin API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { getArticleListAction, getArticleByIdAction, addArticleAction, updateArticleAction, delArticleAction } = require("../../../controller/article");
const { loginCheck } = require('../../../middlewares/loginChecks')

router.prefix("/api/admin/article");

// Get article list
router.get("/getArticleList", loginCheck, async (ctx, next) => {
  ctx.body = await getArticleListAction();
});

// Get article by id
router.get("/getArticleById/:id", loginCheck, async (ctx, next) => {
  const { id } = ctx.params
  ctx.body = await getArticleByIdAction(id);
});

// Add article
router.post("/addArticle", loginCheck, async (ctx, next) => {
  const { type_id, title, article_content, introduce, view_count, addTime } = ctx.request.body;
  ctx.body = await addArticleAction({
    type_id,
    title,
    article_content,
    introduce,
    view_count,
    addTime
  });
});

// update article
router.post("/updateArticle", loginCheck, async (ctx, next) => {
  const { id, type_id, title, article_content, introduce, view_count, addTime } = ctx.request.body;
  ctx.body = await updateArticleAction({
    id,
    type_id,
    title,
    article_content,
    introduce,
    view_count,
    addTime
  });
});

// Delete article
router.get("/delArticle/:id", loginCheck, async (ctx, next) => {
  const { id } = ctx.params
  ctx.body = await delArticleAction(id);
});

module.exports = router;
