// pages/recommendSong/recommendSong.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:"--",
    day:"--",
    recommendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const cookie = wx.getStorageSync('cookie');
    if (!cookie) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要登录帐号",
        cancelText: "回到首页",
        confirmText: "去登陆",
        success({ confirm, cancel }) {
          // 无论用户点击确定还是取消都会触发当前的回调函数
          if (confirm) {
            // 用户点击确定之后会进入当前区域
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            // 用户点击取消之后会进入当前区域
            wx.switchTab({
              url: "/pages/index/index"
            })
          }
          // console.log('success', confirm, cancel)
        }
      })
      return;
    }

    // 获取当天的日期
    const date  = new Date();
    // getDay使用于获取今天是周几
    const day = date.getDate()
    const month = date.getMonth()+1;
    // console.log(day, month)

    this.setData({
      day,
      month
    })


    // 获取当前的推荐列表
    const result = await req("/recommend/songs");
    // console.log(result)
    this.setData({
      recommendList: result.recommend.slice(0,15)
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