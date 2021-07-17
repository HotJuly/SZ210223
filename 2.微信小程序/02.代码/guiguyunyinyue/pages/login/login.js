// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"17688197777",
    password:""
  },

  handleUserName(event){
    // console.log('handleUserName', event)
    // 收集当前用户输入数据,并保存到data中
    const phone = event.detail.value;
    this.setData({
      phone
    })
  },

  handlePassWord(event) {
    // console.log('handleUserName', event)
    // 收集当前用户输入数据,并保存到data中
    const password = event.detail.value;
    this.setData({
      password
    })
  },

  handleInput(event) {
    // console.log('handleInput', event)
    // 小程序中无法像Vue一样直接传入对应参数
    // 通过自定义属性,向事件回调函数内部传参

    // event.target指的是当前事件的触发者(也就是最内层子元素)
    // event.currentTarget指的是当前事件的事件源(也就是绑定了事件的父节点)
    const name = event.currentTarget.dataset.id;
    // 收集当前用户输入数据,并保存到data中
    const value = event.detail.value;
    this.setData({
      [name]: value
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