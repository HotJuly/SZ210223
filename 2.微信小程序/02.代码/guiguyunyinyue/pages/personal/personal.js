// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance:0,
    moveTransition:""
  },

  handleTouchStart(event){
    // touches数组用于记录当前屏幕上所有的手指
    // changedTouches数组用于记录当前屏幕上所有正在变化的手指
    // console.log('handleTouchStart', event.touches[0].clientY)
    this.startY = event.touches[0].clientY;
    // 为了防止用户第二次拖动元素,上一次的moveTransition未清空,导致样式不对
    this.setData({
      moveTransition:""
    })
  },

  handleTouchMove(event) {
    // console.log('handleTouchMove')
    const moveY = event.touches[0].clientY
    // console.log('moveY', moveY)
    const moveDistance = moveY - this.startY;
    // console.log('moveDistance', moveDistance)

    if(moveDistance>80||moveDistance<0)return;
    this.setData({
      moveDistance
    })
  },

  handleTouchEnd(){
    this.setData({
      moveDistance:0,
      moveTransition:"transform  1s"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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