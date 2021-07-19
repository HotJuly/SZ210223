// pages/login/login.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"17688197777",
    password:""
  },

  async handleLogin(){
    // console.log('handleLogin')
    // 1.收集数据
    const {phone,password} = this.data;
    
    // +  前台表单验证(可以减少无用请求的发送,降低服务器压力)
    if (!phone.trim()){
      // 弹窗提示用户需要输入手机号
      // 并且直接结束当前回调函数
      wx.showToast({
        title:"手机号不能为空!!!!!",
        icon:"none"
      })
      return;
    }


    if (!password.trim()) {
      // 弹窗提示用户需要输入密码
      // 并且直接结束当前回调函数
      wx.showToast({
        title: "密码不能为空!!!!!",
        icon: "none"
      })
      return;
    }

    // 2.整理数据
    // 小程序的request,如果发现是GET请求,会自动将data的数据拼接成query传参
    const query = {phone,password};

    // 3.发送请求
    // url:/login/cellphone?phone=xxx&password=yyy
    /* 响应情况:
        1.帐号错误 400
        2.密码错误 502
        3.验证通过 200
    */
    const result = await req('/login/cellphone', query);

    // 4.成功做什么
    if(result.code === 200){
      // 弹窗提示用户登录成功
      wx.showToast({
        title:"登录成功,即将跳转",
        icon:"none"
      })

      // 将用户信息保存到本地存储Storage中
      // 浏览器中localStorage只能存储字符串,小程序中Storage可以存储原生类型、Date、及能够通过JSON.stringify序列化的对象
      // console.log('userInfo',result)
      wx.setStorage({
        key: "userInfo", 
        data: JSON.stringify(result.profile)
      })

      // 跳转到个人中心页面
      // 由于personal页面是一个tabBar页面,所以无法使用wx.navigateTo和redirectTo跳转
      wx.switchTab({
        url: '/pages/personal/personal',
      })
      return;
    }

    // 5.失败做什么
    if (result.code === 400) {
      // 提示用户帐号错误,请检查
      wx.showToast({
        title: "帐号错误,请检查",
        icon: "none"
      })
    } else if (result.code === 502){
      // 提示用户密码错误,请检查
      wx.showToast({
        title: "密码错误,请检查",
        icon: "none"
      })

    }
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