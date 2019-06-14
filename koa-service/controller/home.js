const { createOpenid, getOpenid, updateTime } = require('../lib/db/user')
const { encode, decode } = require('../lib/crypto')
module.exports = {
  findOpenid: async (ctx, openid) => {
    // 加密openid
    const encodeOpenid = encode(openid)
    const resultList = await getOpenid(encodeOpenid)
    // const jiami = encode(openid)
    // console.log('encode', jiami)
    // console.log('decode', decode(jiami))

    const now = Date.now()
    const last = String(Date.now()).slice(8)
    // 判断数据库中是否有对应的openid, 如果没有则创建，有就更新时间
    if (resultList.length === 0) {
      const options = {
        id: Number(last),
        created: 'created-' + last,
        lastLogin: 'last-' + last,
        name: 'jack-' + last,
        avatar: 'avatar-' + last,
        op: encodeOpenid,
        userType: 1,
        createdAt: Date(),
        updatedAt: Date()
      }
      createOpenid(options)
    } else {
      updateTime(resultList[0], { updatedAt: Date() })
    }
  }
}
