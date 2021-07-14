// pages/index/index.js
// 此处在注册一个页面,注册页面可以多次注册
Page({

  /**
   * 页面的初始数据
   */
  /*
    面试题:为什么Vue中的data必须是个函数
    回答:因为后续生成的多个组件,会共享一个data,多个组件的data存储的是对象的引用值,导致一个组件修改状态数据,其他组件都会发生变化

    小程序之所以能够写成对象形式,是因为他底层做了JSON.parse(JSON.stringify(data)进行了深拷贝)
   */
  data: {
    msg:"北鼻"
  },

  handleTap(){
    console.log('handleTap')
  },

  handleParent() {
    console.log('handleParent')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111)
    // 说明小程序没有数据代理
    // this.msg="北鼻1"
    // 说明小程序没有数据劫持
    // this.data.msg="北鼻1";

    // 东抄一半西抄一半
    this.setData({ msg: "北鼻1" });
    console.log('1',this.data.msg)

    this.setData({ msg: "北鼻2" });
    console.log('2', this.data.msg)
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