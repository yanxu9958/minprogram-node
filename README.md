# 项目结构

## koa-service 负责 node 后台处理

|--app.js // 实例化 koa 实例
|--db // 负责数据库的增删改查操作，并把相关的方法暴露出来可以调用
| |--modle.js // 引入 sequelize 负责连接数据库，创建 model ，暴露出 model 对象
| |--user.js // 通过 model 对象创建一些增删改查数据库的方法，并暴露出来
|--middlewares // 公用中间件，统一处理逻辑，如判断是否登陆过期
| |--auth.js // 判断是否登陆过期逻辑
|--actions // 针对业务如登陆等定义的一些方法，会调用 db 下的方法来操作数据库
| |--account.js // 存放登陆逻辑，并将登陆...方法暴露出去
|--router.js // 处理路由逻辑，当请求对应的路由会执行如登陆的方法，查找数据库，存储数据库的操作

### openid 的存储加密

- 登陆后 node 服务器获取 openid --> 1.将 openid 存储在开发者服务器，2.根据用户 id，时间戳等信息生成登陆凭证传递给客户端 --> 后续接口登陆登陆凭证，服务器解析凭证可以获取 openid 及时间戳，去获取用户信息和登陆是否过期
  ![](../img/icon-encode.png)

### 统一获取 token 值

- 做一个路由的中间件，在访问路由是获取请求头中的 'x-session'字段(该字段是自己设置的)

```
module.exports = async function(ctx, next) {
  const sessionKey = ctx.get('x-session')
  console.log('sessionKey', sessionKey)
  await next()
}

```

- 对应小程序客户端 request 请求的设置如下

```
  header: {
    'x-session': wx.getStorageSync(LOGIN_TOKEN)
  }
```

## minprogram 小程序端
