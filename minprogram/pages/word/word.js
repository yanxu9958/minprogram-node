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
    suffix: '',
    isPlay: false,
    index: 0
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
      const textList = movie_text.map(item => {
        const list = item.en_text.split(en_word)
        const reg = new RegExp(en_word)
        item.hasWord = reg.test(item.en_text)
        console.log('list', list, item.hasWord)

        item.prefix = list[0]
        item.suffix = list[1]
      })
      this.setData({
        audio,
        video,
        symbol: en_audio,
        textList: movie_text,
        targetWord: en_word,
        explanation: cn_word
      })
      console.log(this.data.textList)
      this.setTextDisplay()
    })
  },
  setTextDisplay() {
    const list = this.data.textList
    list.forEach((item, index) => {
      const { start_time } = item
      console.log('start_time', start_time)

      if (index === 0) {
        setTimeout(() => {
          this.setData({
            isPlay: true
          })
        }, start_time * 1000)
      } else {
        setTimeout(() => {
          this.setData({
            index
          })
        }, start_time * 1000)
      }
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
