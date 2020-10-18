/**
 * @description Admin user API router
 * @author Fan Yang
 */

const router = require("koa-router")();
const { loginAction, registerAction } = require('../../../controller/user')

router.prefix("/api/admin/user");

// User login
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await loginAction(ctx, userName, password);
});

// User register
router.post('/register', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await registerAction({
    userName,
    password
  })
})

module.exports = router