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

  封装组件
    1.保留重复出现的代码片段(wxml+wxss+部分js)
    2.通过标签属性传入动态变化的数据(props)
    3.谁使用谁传入

 */
import config from './config.js';
let cookie = wx.getStorageSync('cookie');

export default function(url,data={},method="GET"){
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.mpHost + url,
      data,
      method,
      header:{
        // 项目初始化之后,一开始应该是没有cookie数据的,所以此处会是空
        // 只有等用户登录过之后,此处才会有数据
        cookie
      },
      success: (res) => {
        // result = res;
        // 将响应体数据返回出去
        // 第二次回来了,当我们准备请求video页面数据的时候,发现需要使用到响应头中的cookie
        // 存储cookie的条件是什么?必须是登录接口的cookie才保存
        // 1.当发送登录请求的时候,在data中创建isLogin属性,用于声明当前接口是登录接口
        // 2.在成功回调中,通过isLogin属性判断是否要保存当前请求的cookie
        if (data.isLogin) {
          // console.log('res', res)

          //现在这种写法一共将cookie保存两份,
          // 保存在硬盘中是为了用户下次开启项目使用
          // 保存在内存中是为了当前本次运行项目使用,因为内存的性能优于硬盘读写的性能

          //此操作是将cookie保存到硬盘中
          // 类似于gulishop中的将token存放到localStorage中
          const c1 = res.cookies.find((item) => {
            return item.startsWith('MUSIC_U');
          });
          wx.setStorageSync("cookie", c1);

          // 此操作是将cookie存放到内存中
          // 类似于gulishop中的将token存放到Vuex中
          cookie = c1;
        }
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
