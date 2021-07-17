import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[], //用于控制轮播图的显示
    recommendList:[], //用于控制推荐歌曲区域的显示
    topList:[]  //用于控制排行榜区域显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /*
      1.在哪发?
        onLoad是最早的生命周期,就在这里发送
      2.怎么发?
        小程序中没有window,全局对象是wx
        小程序中使用wx.request发送请求
      3.往哪发?
        请求三要素:请求地址+请求方式+请求参数
     */
    // console.log("window", window);
    // console.log("wx", wx);
    // console.log(123)
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   data:{
    //     type:2
    //   },
    //   method:"GET",
    //   success:(res)=>{
    //     // console.log(res)
    //     const { data: { banners }} = res;
    //     this.setData({
    //       banners
    //     })
    //   }
    // })

    // const result =await req("/banner",{type:2});
    // // console.log(result)
    // const { banners } = result;
    // this.setData({
    //   banners
    // })

    // 请求获取轮播图列表数据
    req("/banner", { type: 2 })
    .then(({ banners }) => {
      this.setData({
        banners
      })
    })
    


    // wx.request({
    //   url: "http://localhost:3000/personalized",
    //   data: {
    //   },
    //   method: "GET",
    //   success: (res) => {
    //     // console.log(res)
    //     const { data: { result: recommendList } } = res;
    //     this.setData({
    //       recommendList
    //     })
    //   }
    // })
    // console.log(234)


    // const result1 = await req("/personalized");
    // // console.log(result)
    // const { result: recommendList } = result1;
    // this.setData({
    //   recommendList
    // })


    // 请求获取推荐歌曲列表数据
    req("/personalized")
    .then(({ result: recommendList }) => {
      this.setData({
        recommendList
      })
    });

    // 请求获取排行榜数据  
    const idxArr = [2,4,6,10];
    const topList = [];
    let i = 0;
    while (i<idxArr.length) {
      req("/top/list", { idx: idxArr[i++] })
        .then(({ playlist }) => {
          const obj = {};
          obj.name = playlist.name;
          obj.list = playlist.tracks.slice(0, 3);
          obj.list = obj.list.map((item) => {
            return {
              imgUrl: item.al.picUrl,
              topName: item.al.name
            }
          })
          topList.push(obj);
          // console.log(obj)
          // 相当于每次请求成功都更新一次页面,也就是需要更新4次
          this.setData({
            topList
          })
        })
    }
    // console.log(topList)
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