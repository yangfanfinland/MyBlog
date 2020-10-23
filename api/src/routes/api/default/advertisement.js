/**
 * @description Advertisement default API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const {
  getAdvertisementListAction,
} = require("../../../controller/advertisement");

router.prefix("/api/default/advertisement");

// Get advertisement list
router.get("/getAdvertisementList", async (ctx, next) => {
  ctx.body = await getAdvertisementListAction();
});

module.exports = router;
