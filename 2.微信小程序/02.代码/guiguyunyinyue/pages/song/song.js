// pages/song/song.js
import PubSub from 'pubsub-js';
import moment from 'moment';
import req from '../../utils/req.js';

// 获取到全局唯一的小程序实例
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{},
    songId:"",
    musicUrl:"",
    isplay:false,
    durationTime: 0,
    currentTime: "00:00",
    currentWidth:"80"
  },

  // 用于接收每日推荐页面发送回来的songid,并请求对应数据展示
  getSongId(msg, songId){
    this.setData({
      songId
    });
    this.getMusicDetail();
  },

  // 用于请求当前songid对应的歌曲详细信息
  async getMusicDetail(){
    //发送请求获取歌曲详细信息
    const result = await req('/song/detail', { ids: this.data.songId });
    const songObj = result.songs[0];
    // moment(需要格式化的毫秒值).format(需要输出的格式)
    // const durationTime = moment(songObj.dt).format('mm:ss');
    // console.log(result)
    // 动态设置当前页面的导航栏标题
    wx.setNavigationBarTitle({
      title: songObj.name
    });

    this.setData({
      songObj,
      durationTime: songObj.dt
    })
  },

  // 用于监视用户点击上一首/下一首按钮操作,自动切换对应歌曲并播放
  switchSong(event){
    // console.log('switchSong')
    // 此处代码如果重复执行,就会绑定多个订阅,导致请求重复发送
    // PubSub.subscribe('sendId',(msg,songId)=>{
    //   // console.log('data', data)
    //   this.setData({
    //     songId
    //   });
    //   this.getMusicDetail();
    // })

    const {id} = event.currentTarget;
    PubSub.publish('switchType', id);
  },

  // 用于绑定背景音频管理器相关事件
  addEvent(){

    // 用于监视背景音频开始播放事件
    this.backgroundAudioManager.onPlay(() => {
      // console.log('onPlay')

      // 判断当前页面跟正在播放的背景音频是否是同一首歌
      if (appInstance.globalData.audioId === this.data.songId) {
        // 使用小程序唯一的实例，记录当前背景音频管理器音乐的播放状态
        appInstance.globalData.playState = true;

        this.setData({
          isplay: true
        })
      }
    })

    // 用于监视背景音频暂停事件
    this.backgroundAudioManager.onPause(() => {
      // console.log('onPause')

      if (appInstance.globalData.audioId === this.data.songId) {
        // 使用小程序唯一的实例，记录当前背景音频管理器音乐的播放状态
        appInstance.globalData.playState = false;
        this.setData({
          isplay: false
        })
      }
    })

    // 用于监视背景音频进度更新事件
    this.backgroundAudioManager.onTimeUpdate(() => {
      const { currentTime,duration} = this.backgroundAudioManager;
      // 获取到当前的时间进度并且更新页面
      const currentTime1 = moment(currentTime*1000).format("mm:ss");

      // 计算进度条的长度:当前时间/总时长
      const currentWidth = currentTime / duration *100;
      // console.log('onTimeUpdate',currentTime)
      this.setData({
        currentTime: currentTime1,
        currentWidth
      })
    })
  },
  
  //用于监视用户对播放按钮的点击操作,用于控制音乐播放
  handlePlay(){
    // console.log('handlePlay')

    // 播放对应的歌曲
    //  1.生成全局唯一的背景音频管理器
    // const backgroundAudioManager = wx.getBackgroundAudioManager();

    // 需要判断当前页面的播放状态
    if(this.data.isplay){
      // 只有当前页面正处于播放状态,才能进入此处
      // 进入之后需要暂停当前音频
      this.backgroundAudioManager.pause();

      // 使用小程序唯一的实例，记录当前背景音频管理器音乐的播放状态
      appInstance.globalData.playState = false;
    } else {
      // 只有当前页面正处于暂停状态,才能进入此处
      // 进入之后需要播放当前音频


      //  2.输入src/title,告知即将播放的音频链接,标题
      // 注意:此处官方文档只说需要src,但实际上还需要title,否则无法自动播放
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;

      // 使用小程序唯一的实例，记录当前背景音频管理器正在播放的歌曲id
      appInstance.globalData.audioId = this.data.songId;
      // 使用小程序唯一的实例，记录当前背景音频管理器音乐的播放状态
      appInstance.globalData.playState = true;
    }

    // 让页面播放的C3效果停下来或者冻起来
    this.setData({
      isplay: !this.data.isplay
    })
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

    // //发送请求获取歌曲详细信息
    // const result = await req('/song/detail', { ids: songId });
    // const songObj = result.songs[0];
    // // console.log(result)
    // // 动态设置当前页面的导航栏标题
    // wx.setNavigationBarTitle({
    //   title: songObj.name
    // });

    // this.setData({
    //   songObj,
    //   songId
    // })
    this.setData({
      songId
    });
    this.getMusicDetail();

    const urlInfo = await req('/song/url', { id: songId});
    // console.log('urlInfo', urlInfo)
    this.setData({
      musicUrl: urlInfo.data[0].url
    })

    // 读取数据的方法和普通对象相同
    // 修改数据的方法和普通对象相同
    // 属性名可以任意取,没有任何限制
    // 总结:他就是普通对象
    // console.log(1,appInstance.globalData.msg)
    // appInstance.globalData.msg = "我是修改之后的数据"
    // console.log(2, appInstance.globalData.msg)

    // 判断背景音频是否正在播放
    // 判断两首歌是不是同一首歌
    const {audioId,playState} = appInstance.globalData;
    if (playState&&songId===audioId){
      this.setData({
        isplay:true
      })
    }

    // 绑定背景音频管理器相关的事件监听
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.addEvent();

    // console.log(PubSub)
    //由于onLoad只会执行一次,所以,在此处绑定订阅,就不会重复订阅
    PubSub.subscribe('sendId', this.getSongId);
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
    // 解绑已订阅的消息,相当于Vue中解绑全局事件总线
    PubSub.unsubscribe(this.getSongId)
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