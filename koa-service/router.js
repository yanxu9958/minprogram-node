const Router = require('koa-router')
const router = new Router()
const jsonMine = 'application/json'
const { findAll } = require('./lib/db/user')
const { login } = require('./actions/account')
module.exports = app => {
  router.get('/login', async (ctx, next) => {
    const { code } = ctx.request.query
    console.log('code', code)

    const all = await findAll()
    const session = await login(code)
    ctx.type = jsonMine
    ctx.body = {
      status: 0,
      session,
      data: all
    }
  })
  app.use(router.routes())
}
