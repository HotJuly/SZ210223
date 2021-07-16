Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      1.在哪发?
        onLoad是最早的生命周期,就在这里发送
      2.怎么发?
        小程序中没有window,全局对象是wx
        小程序中使用wx.request发送请求
      3.往哪发?
        请求三要素:请求地址+请求方式+请求参数
     */
    // console.log("window", window);
    // console.log("wx", wx);
    // console.log(123)
    wx.request({
      url:"http://localhost:3000/banner",
      data:{
        type:2
      },
      method:"GET"
    })
    // console.log(234)
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