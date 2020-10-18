/**
 * @description Article default API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { getArticleListAction, getArticleListByTypeIdAction, getArticleByIdAction } = require("../../../controller/article");

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
  ctx.body = await getArticleByIdAction(id);
});

module.exports = router;
