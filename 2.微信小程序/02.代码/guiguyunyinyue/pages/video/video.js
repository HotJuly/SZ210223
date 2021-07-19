// pages/video/video.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentId:"",
    videoList:[]
  },

  // 用于请求视频列表数据
  async getVideoList(){
    // 此接口最麻烦的地方就是需要携带cookie,但是小程序不会自动保存和发送cookie
    // 最终保存和发送cookie需要我们自己来
    const { datas } = await req('/video/group', { id: this.data.currentId });
    // console.log('result', result)
    const videoList = datas.map((item) => {
      return item.data
    });
    this.setData({
      videoList
    })
    wx.hideLoading();
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
      currentId:id,
      videoList:[]
    })
    wx.showLoading({
      title:"加载中,请稍等"
    })

    this.getVideoList();
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
    this.getVideoList();
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
  onShareAppMessage: function ({ from,target}) {
    // console.log('onShareAppMessage')
    // 需求:根据用户触发渠道的不同,自定义转发内容
    // 如果是右上角转发按钮,就转发小程序名称+小程序logo+首页路径
    // 如果是button转发按钮,就转发当前视频名称+视频图片+video页面路径
    // from代表的是触发当前回调函数的来源
    // target代表的是平常点击事件中的event.currentTarget
    // console.log('onShareAppMessage', from, target)

    if (from === "menu"){
      return{
        title:"硅谷云音乐",
        page:"/pages/index/index",
        imageUrl: "/static/images/logo.png"
      }
    } else if (from === "button"){
      // 自定义属性只能使用小写,使用大写命名也会呗自动转为小写
      const {title,imageurl} = target.dataset
      return {
        title,
        page: "/pages/video/video",
        imageUrl: imageurl
      }
    }
    // return {
    //   title:"武松打老虎",
    //   path:"/pages/index/index",
    //   imageUrl:"/static/images/dazuo.jpeg"
    // }
  }
})