/**
 * @description Article default API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { getArticleListAction, getArticleListByTypeIdAction, getArticleByIdAction, updateArticleViewCount } = require("../../../controller/article");

router.prefix("/api/default/article");

// Get article list
router.get("/getArticleList", async (ctx, next) => {
  ctx.body = await getArticleListAction();
});

// Get article list by type id
router.get("/getArticleListByTypeId/:id", async (ctx, next) => {
  const { id } = ctx.params
  ctx.body = await getArticleListByTypeIdAction(id);
});

// Get article by id
router.get("/getArticleById/:id", async (ctx, next) => {
  const { id } = ctx.params
  const result = await getArticleByIdAction(id);

  ctx.body = result

  let { view_count } = result.data;
  view_count = view_count + 1;
  await updateArticleViewCount(id, view_count);
});

module.exports = router;
