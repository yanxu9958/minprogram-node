import { wxToast, wxLoading } from './loading.js'
import { LOGIN_TOKEN } from './localStorage'
export default function callApi({
  url,
  params,
  loading = true,
  method = 'GET'
}) {
  let baseUrl = 'http://localhost:5000/'
  let initPrm = {}
  for (let item in params) {
    typeof params[item] === 'undefined' && (params[item] = '')
  }

  Object.assign(initPrm, params)
  loading && wxLoading()
  return new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl + url,
      data: initPrm,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'x-session': wx.getStorageSync(LOGIN_TOKEN)
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
          wxToast(res.data.message)
          reject(res.data)
        }
      },
      fail: function(res) {
        wx.hideLoading()
        reject(res)
      }
    })
  })
}
