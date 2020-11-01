const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors');

const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
// Routers
const index = require('./routes/index')
const userAdminAPIRouter = require('./routes/api/admin/user')
const typeAdminAPIRouter = require('./routes/api/admin/type')
const articleAdminAPIRouter = require('./routes/api/admin/article')
const userDefaultAPIRouter = require('./routes/api/default/user')
const typeDefaultAPIRouter = require('./routes/api/default/type')
const articleDefaultAPIRouter = require('./routes/api/default/article')
const advertisementDefaultAPIRouter = require('./routes/api/default/advertisement')

const app = new Koa()
app.use(cors({
  origin: (e) => {
    const origin = e.request.header.origin
    // const whiteList = ['http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3002', 'http://127.0.0.1:3003']
    // if (whiteList.indexOf(origin) > -1) {
    //   return origin;
    // }
    return origin;
  },
  credentials: true
}));

// error handler
onerror(app)


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// Session configure
app.keys = [SESSION_SECRET_KEY]
app.use(
  session({
    key: 'blog.sid', // cookie name, default is `koa.sid`
    prefix: 'blog:sess:', // prefix of redis key, default is `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userAdminAPIRouter.routes(), userAdminAPIRouter.allowedMethods())
app.use(typeAdminAPIRouter.routes(), typeAdminAPIRouter.allowedMethods())
app.use(articleAdminAPIRouter.routes(), articleAdminAPIRouter.allowedMethods())
app.use(userDefaultAPIRouter.routes(), userDefaultAPIRouter.allowedMethods())
app.use(typeDefaultAPIRouter.routes(), typeDefaultAPIRouter.allowedMethods())
app.use(articleDefaultAPIRouter.routes(), articleDefaultAPIRouter.allowedMethods())
app.use(advertisementDefaultAPIRouter.routes(), advertisementDefaultAPIRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
