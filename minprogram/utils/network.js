import { wxToast, wxLoading } from './loading.js'
import { LOGIN_TOKEN } from './localStorage'
export default function callApi({
  url,
  params,
  loading = true,
  method = 'POST'
}) {
  let baseUrl = 'http://localhost:8082/'
  // let baseUrl = 'http://118.31.127.58:8084/'
  let initPrm = {
    token: wx.getStorageSync(LOGIN_TOKEN)
  }
  for (let item in params) {
    typeof params[item] === 'undefined' && (params[item] = '')
  }

  Object.assign(initPrm, params)
  console.log('data', initPrm)

  loading && wxLoading()
  return new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl + url,
      data: initPrm,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        const { code } = res.data
        wx.hideLoading()
        if (code == 0) {
          resolve(res.data)
        } else if (code == 2) {
          wx.setStorageSync('token', '')
          wx.reLaunch({
            url: '/pages/index/index'
          })
          reject(res.data)
        }
        wxToast(res.data.message)
      },
      fail: function(res) {
        wx.hideLoading()
        reject(res)
      }
    })
  })
}
