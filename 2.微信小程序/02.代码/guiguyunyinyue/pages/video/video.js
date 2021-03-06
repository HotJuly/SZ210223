
// pages/video/video.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentId:"",
    videoList:[],
    playVId:"",
    isTriggered:false
  },

  // 用于监视用户上拉videoList列表触底操作,获取更多数据
  handleScrollToLower(){
    // console.log('handleScrollToLower')
    setTimeout(()=>{
      this.setData({
        videoList: [...this.data.videoList, ...this.data.videoList]
      })
    },1000)
  },

  // 用于监视用户下拉videoList列表操作,获取最新数据
  async handlePullDownRefresh(){
    // console.log('handlePullDownRefresh')
    await this.getVideoList();
    this.setData({
      isTriggered:false
    })
  },

  // 用于监视用户对image组件的点击操作,用于切换对应的video组件
  switchVideo(event){
    // 一.通过状态来显示对应的video组件
    // 1.通过自定义属性将当前的vid传入当前事件内部
    // 2.通过更新状态来显示对应的video组件
    // 扩展:由于小程序的setData更新数据是同步的,但是更新视图是异步的,而当前我们需要确保video组件更新出来之后,才进行播放操作,所以可以在setData调用中,传入第二个实参,数据类型为函数,这个函数会在视图更新之后才会执行(类似于Vue中的vm.$nextTick)


    // 注意:image组件上的id和data-vid都是为了向当前函数内部进行传参使用,选一者即可
    // video组件的id是因为后续需要创建video上下文,操作当前video组件,小程序官方要求,必须要有
    const {vid} = event.currentTarget.dataset;
    this.setData({
      playVId:vid
    },()=>{
      // wx.createVideoContext(组件标签的id属性)
      const videoContext = wx.createVideoContext(vid);
      videoContext.play();
    })


    // 二.通过js控制video组件播放视频
    // 1.获取到对应的video组件的上下文对象
    // 2.调用API播放video视频(播放的API是play方法)
    // console.log('switchVideo');
    // const videoContext = wx.createVideoContext(vid);
    // videoContext.play();
  },

  //用于练习,测试控制视频暂停播放API
  testAPI(){
    // console.log('testAPI')
    // 1.根据当前的video组件的id,生成对应的上下文对象,用于操作对应的video组件
    const videoContext = wx.createVideoContext("vid0");
    // 2.调用对应API,可以操作对应的video组件
    videoContext.pause();
  },

  // 用于监视视频的播放操作
  handlePlay(event){
    // console.log('handlePlay')
    // console.log('this.oldVId', this.oldVId)
    const { id } = event.currentTarget;

    //判断条件有两个
    // 1.判断是否有值,是为了防止第一次播放,没有上一个视频,会报错
    // 2.判断当前id和上一个视频id是否相同,相同就不暂停
    if (this.oldVId && this.oldVId !== id) {
      // 1.根据当前的video组件的id,生成对应的上下文对象,用于操作对应的video组件
      const videoContext = wx.createVideoContext(this.oldVId);
      // 2.调用对应API,可以操作对应的video组件
      videoContext.pause();
    }

    // 获取当前vid,并保存起来
    this.oldVId = id;
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
    // 当用户进入video页面,检查用户是否登录,如果没有登录就弹出模态对话框
    const cookie = wx.getStorageSync('cookie');
    if (!cookie){
      wx.showModal({
        title:"请先登录",
        content:"该功能需要登录帐号",
        cancelText:"回到首页",
        confirmText:"去登陆",
        success({confirm,cancel}){
          // 无论用户点击确定还是取消都会触发当前的回调函数
          if (confirm){
            // 用户点击确定之后会进入当前区域
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            // 用户点击取消之后会进入当前区域
            wx.switchTab({
              url:"/pages/index/index"
            })
          }
          // console.log('success', confirm, cancel)
        }
      })
      return;
    }

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
    console.log('onPullDownRefresh')
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