/**
 * @description Article type Default API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { getArticleTypeListAction } = require("../../../controller/type");

router.prefix("/api/default/type");

// Get type list
router.get("/getTypeInfo", async (ctx, next) => {
  ctx.body = await getArticleTypeListAction();
});

module.exports = router;
