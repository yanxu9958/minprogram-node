import callApi from '../../utils/network'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRemember: false,
    movieText: '',
    targetWord: '',
    audio: '',
    video: '',
    symbol: '',
    textList: [],
    explanation: '',
    prefix: '',
    suffix: ''
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
  onLoad: function(options) {
    this.repalceWrod()
    callApi({
      url: 'word'
    }).then(res => {
      res.data.forEach(item => {
        item.movie_text = JSON.parse(item.movie_text)
      })
      const {
        audio,
        video,
        en_word,
        movie_text,
        en_audio,
        cn_word
      } = res.data[0]
      console.log('value', audio, video, en_word, movie_text, en_audio, cn_word)

      this.setData({
        audio,
        video,
        symbol: en_audio,
        textList: movie_text,
        targetWord: en_word,
        explanation: cn_word
      })
    })
  },
  repalceWrod() {
    const { targetWord, movieText } = this.data
    const list = movieText.split(targetWord)
    this.setData({
      prefix: list[0],
      suffix: list[1]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    this.audioCtx.src = this.data.audio
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
