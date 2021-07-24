/*
	请求基础路径与小程序不同
		如果当前运行环境是小程序,需要以http://localhost:3001开头
		如果当前运行环境是浏览器,需要以/api开头
		问题:如何知道当前代码的运行环境是什么?
		解决:通过uni.getSystemInfoSync()可以获取到当前手机信息
			小程序中platform是"devtools"
			浏览器中platform是"ios"
*/

import config from './config.js';

let baseUrl = "";
// const {platform} = uni.getSystemInfoSync();
// if(platform==="devtools"){
// 	// 能进入此处就说明当前运行环境是小程序
// 	baseUrl = config.mpHost;
// }else if(platform==="ios"){
// 	// 能进入此处就说明当前运行环境是ios系统的浏览器
// 	baseUrl = config.h5Host;
// }

// #ifdef MP-WEIXIN
	baseUrl = config.mpHost;
// #endif

// #ifdef H5
	baseUrl = config.h5Host;
// #endif


// console.log(uni.getSystemInfoSync());

export default function(url,data={},method="GET"){
	return new Promise((resolve,reject)=>{
		uni.request({
		   // url:"/api/getIndexData",
		   url:baseUrl+url,
		   data,
		   method,
		   success:(res)=>{
				// console.log('res',res)
				resolve(res.data)
		   }
		})
	})
}