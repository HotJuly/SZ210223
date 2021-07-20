// pages/song/song.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{},
    musicUrl:"",
    isplay:false
  },
  
  //用于监视用户对播放按钮的点击操作,用于控制音乐播放
  handlePlay(){
    // console.log('handlePlay')

    // 播放对应的歌曲
    //  1.生成全局唯一的背景音频管理器
    const backgroundAudioManager = wx.getBackgroundAudioManager();

    // 需要判断当前页面的播放状态
    if(this.data.isplay){
      // 只有当前页面正处于播放状态,才能进入此处
      // 进入之后需要暂停当前音频
      backgroundAudioManager.pause(); 
    } else {
      // 只有当前页面正处于暂停状态,才能进入此处
      // 进入之后需要播放当前音频


      //  2.输入src/title,告知即将播放的音频链接,标题
      // 注意:此处官方文档只说需要src,但实际上还需要title,否则无法自动播放
      backgroundAudioManager.src = this.data.musicUrl;
      backgroundAudioManager.title = this.data.songObj.name;

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

    const urlInfo = await req('/song/url', { id: songId});
    // console.log('urlInfo', urlInfo)
    this.setData({
      musicUrl: urlInfo.data[0].url
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