// pages/song/song.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 小程序只能传递query参数,并且在onLoad生命周期的形参中会生成query对象
    // 小程序url有长度限制
    // console.log(options)

    // 获取对应的歌曲id
    const {songId} = options;

    //发送请求获取歌曲详细信息
    const result = await req('/song/detail', { ids: songId });
    const songObj = result.songs[0];
    // console.log(result)
    // 动态设置当前页面的导航栏标题
    wx.setNavigationBarTitle({
      title: songObj.name
    });

    this.setData({
      songObj
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