// 该文件的功能是可以发送请求
// 暴露的内容必须是个函数,调用这个函数可以主动发送请求
/*
  封装代码的核心思想
    1.保留重复出现的部分
    2.通过外部传入不断变化的部分

  封装函数
    1.保留重复出现的js代码
    2.通过形参传入动态变化的数据
    3.谁调用谁传入

 */
import config from './config.js';

export default function(url,data={},method="GET"){
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.mpHost + url,
      data,
      method,
      success: (res) => {
        // result = res;
        resolve(res.data)
        // console.log(res)
        // const { data: { banners } } = res;
        // this.setData({
        //   banners
        // })
      }
    })
  })
 
  // return result;
}
