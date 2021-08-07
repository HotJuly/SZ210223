import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 可以开启或者关闭调试工具
// Vue.config.devtools = true

// 自定义合并策略
// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   console.log('optionMergeStrategies',parent, child, vm)
//   return child + 1 ;
// }

/* 面试题:上线之后如何捕获并维护用户出现的错误
  1.如何捕获用户出现的错误
    在Vue之前,如果项目中出现错误,可以通过window.onerror捕获错误
      window.onerror=function(error){}

    在Vue项目中,使用Vue.config.errorHandler可以捕获项目中出现的错误

  2.我们如何知道用户出的错误
    在回调函数内部发送ajax请求,将错误信息发送到公司服务器
    第二天,公司系统会将出现的错误反馈给你
    注意:如果是公司重大BUG,赶紧回退版本,别第一反应就是改BUG
  
*/

// Vue.config.errorHandler=function(err, vm, info){
//   console.log('errorHandler',err, vm, info)
// }

// 需求:所有组件mounted的时候,打印自身配置对象中的name属性
// Vue.mixin({
//   mounted(){
//     console.log(this.$options.name)
//   }
// })


// Vue1中,App组件的挂载实际上是向页面上的div#app元素内部插入元素
// Vue2中,App组件的挂载实际上是将页面上的div#app元素替换掉
// 渲染内容优先级:render属性>template属性>html内容
new Vue({
  name:"root",
  render: h => h(App),
  // template:"<h1>大佐牛逼`!</h1>",
}).$mount('#app')
// new Vue()

// var res = Vue.compile('<h1>{{msg}},大佐牛逼~!</h1>')
// console.log(res)

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   el:"#app",
//   render: res.render,
// })