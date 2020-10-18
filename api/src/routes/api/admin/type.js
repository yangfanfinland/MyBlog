/**
 * @description Article type Admin API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { getArticleTypeListAction } = require('../../../controller/type')
const { loginCheck } = require('../../../middlewares/loginChecks')

router.prefix("/api/admin/type");

// Get type list
router.get("/getTypeList", loginCheck, async (ctx, next) => {
  ctx.body = await getArticleTypeListAction();
});

module.exports = router