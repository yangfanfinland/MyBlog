/**
 * @description User default API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { getUserInfoAction } = require("../../../controller/user");

router.prefix("/api/default/user");

// Get user info
router.get("/:userName", async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = await getUserInfoAction(ctx, userName);
});

module.exports = router;
