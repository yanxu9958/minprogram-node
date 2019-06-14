const Router = require('koa-router')
const router = new Router()
const jsonMine = 'application/json'
const { findAll } = require('./lib/db/user')
const { login } = require('./actions/account')
const { findOpenid } = require('./controller/home')

module.exports = app => {
  router.get('/login', async (ctx, next) => {
    const { code } = ctx.request.query
    const all = await findAll()
    const session = await login(code)
    if (session) {
      const { session_key, openid } = session
      // 查找数据是否已经存有openid
      await findOpenid(ctx, openid)
      ctx.type = jsonMine
      ctx.body = {
        status: 0,
        data: {
          openid,
          list: all
        }
      }
    } else {
      throw new Error('登陆失败')
    }
  })
  app.use(router.routes())
}
