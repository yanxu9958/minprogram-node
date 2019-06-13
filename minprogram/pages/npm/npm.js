// pages/npm/npm.js
const moment = require('moment')
import callApi from '../../utils/network'
// import LoadingButton from '../../components/loadingButton/loadingButton'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'使用npm'
    })
    this.reFindCardList()
    
  },
  bindButtonTap(e){
    console.log('按钮点击事件触发了',e);
  },
  reFindCardList(){
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bc94237364160152beb30e7/card_list',
    //   success(res){
    //     console.log('res',res);
        
    //   }
    // })
    callApi({
      url:'card_list',
      method:'GET'
    }).then(res=>{
      console.log('res',res);
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})