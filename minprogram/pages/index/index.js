import callApi from '../../utils/network'
import { LOGIN_TOKEN } from '../../utils/localStorage'
Page({
  data: {
    token: '',
    list: [],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindLoginTap() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登陆成功', res)
        callApi({
          url: 'login',
          params: { code: res.code }
        })
          .then(res => {
            const { token } = res.data
            console.log('token', res.data)

            if (token) {
              this.setData({
                token
              })
              // 拿到token存储到客户端
              wx.setStorageSync(LOGIN_TOKEN, token)
            }
          })
          .catch(err => {
            console.log('err', err)
          })
      }
    })
  },
  onLoad: function() {}
})
