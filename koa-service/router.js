const Router = require('koa-router')
const router = new Router()
const jsonMine = 'application/json'
const { findAll } = require('./lib/db/user')
const { login } = require('./actions/account')
const { findOpenid } = require('./controller/home')
const { encode } = require('./lib/crypto')
const auth = require('./middlewares/auth')

module.exports = app => {
  router.get('/login', async (ctx, next) => {
    const { code } = ctx.request.query
    const all = await findAll()
    const session = await login(code)
    if (session) {
      const { session_key, openid } = session
      // 查找数据是否已经存有openid，进行数据库相关逻辑操作
      await findOpenid(ctx, openid)
      ctx.type = jsonMine
      ctx.body = {
        code: 0,
        // 加密的登陆凭证
        token: encode(openid),
        message: '成功'
      }
    } else {
      throw new Error('登陆失败')
    }
  })
  router.get('/user', auth, (ctx, next) => {
    const { isExpired, user } = ctx.state
    ctx.type = jsonMine
    // 判断是否过期返回不同的状态
    if (isExpired) {
      ctx.body = {
        code: 2,
        message: '登陆过期'
      }
    } else {
      ctx.body = {
        code: 0,
        data: ctx.state.user
      }
    }
  })
  app.use(router.routes())
}
