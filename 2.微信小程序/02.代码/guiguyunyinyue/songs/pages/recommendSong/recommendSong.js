// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js';
import req from '../../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:"--",
    day:"--",
    recommendList:[],
    currentIndex:null
  },

  //监视用户点击歌曲选项,跳转到song页面
  toSong(event){
    const {songid,index} = event.currentTarget.dataset;
    // console.log('song', song)
    // 需要获取到当前选项对应的歌曲对象
    // 注意:此方法失败,因为url有长度限制,song对象太大了
    // wx.navigateTo({
    //   url: '/pages/song/song?song='+ JSON.stringify(song),
    // })
    this.setData({
      currentIndex: index
    })
    wx.navigateTo({
      url: '/songs/pages/song/song?songId=' + songid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const cookie = wx.getStorageSync('cookie');
    if (!cookie) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要登录帐号",
        cancelText: "回到首页",
        confirmText: "去登陆",
        success({ confirm, cancel }) {
          // 无论用户点击确定还是取消都会触发当前的回调函数
          if (confirm) {
            // 用户点击确定之后会进入当前区域
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            // 用户点击取消之后会进入当前区域
            wx.switchTab({
              url: "/pages/index/index"
            })
          }
          // console.log('success', confirm, cancel)
        }
      })
      return;
    }

    // 获取当天的日期
    const date  = new Date();
    // getDay使用于获取今天是周几
    const day = date.getDate()
    const month = date.getMonth()+1;
    // console.log(day, month)

    this.setData({
      day,
      month
    })


    // 获取当前的推荐列表
    const result = await req("/recommend/songs");
    // console.log(result)
    this.setData({
      recommendList: result.recommend.slice(0,15)
    })

    // 订阅消息,用于接收song页面发过来的用户操作的按钮(需要找的歌曲是上一首还是下一首)
    PubSub.subscribe('switchType',(msg,data)=>{
      // console.log('switchType', msg, data)
      let { currentIndex, recommendList} = this.data;
      if(data==="next"){
        // 能进入这里说明用户点击了下一首
        if(currentIndex===recommendList.length-1){
          // 如果当前已经是最后一首歌,就回到列表的第一首歌去
          currentIndex=0;
        } else {
          currentIndex += 1;
        }
      }else{
        // 能进入这里说明用户点击了上一首
        if(currentIndex===0){
          // 如果当前已经是第一首歌,就回到列表的最后一首歌去
          currentIndex= recommendList.length-1;
        } else {
          currentIndex -= 1;
        }
      }
      // 通过下标找到对应歌曲的id
      const id = recommendList[currentIndex].id;
      this.setData({
        currentIndex
      })

      // 将歌曲id发送给song页面
      PubSub.publish('sendId',id);
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