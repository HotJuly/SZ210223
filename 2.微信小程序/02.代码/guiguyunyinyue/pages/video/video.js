// pages/video/video.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentId:""
  },

  // 用于监视用户点击导航栏操作,并切换下划线的位置
  changeCurrentId(event){
    // console.log('changeCurrentId')
    // 获取到通过自定义属性,传入进来的当前点击项的id
    //此处不能使用target,因为当前自定义属性是绑定给了view标签,我们可能会点击到内部的text标签,那么此时触发者就是text标签,而text标签身上没有自定义属性
    // const { id } = event.target.dataset;
    const { id } = event.currentTarget.dataset;
    // console.log('id', id)

    // 更新状态数据中的currentId,从而控制下划线显示
    this.setData({
      currentId:id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // /video/group/list
    // const {data} = await req('/video/group/list'); 
    // this.setData({
    //   navList: data.slice(0,14),
    //   currentId:data[0].id
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    // 请求导航列表数据
    const { data } = await req('/video/group/list');
    this.setData({
      navList: data.slice(0, 14),
      currentId: data[0].id
    });


    // 请求视频列表数据
    // 此接口最麻烦的地方就是需要携带cookie,但是小程序不会自动保存和发送cookie
    // 最终保存和发送cookie需要我们自己来
    const result = await req('/video/group',{id:this.data.currentId});
    console.log('result', result)
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