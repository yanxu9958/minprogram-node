// pages/word/word.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRemember: false
  },
  bindAudioTap() {
    this.audioCtx.play()
  },
  bindRemberTap() {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '点击后你将不再复习这个单词',
      confirmText: '知道了',
      showCancel: false,
      success(res) {
        console.log('this', _this)

        _this.setData({
          isRemember: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    this.audioCtx.src =
      'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '氧气单词',
      desc: '',
      path: '/pages/word/word'
    }
  }
})
