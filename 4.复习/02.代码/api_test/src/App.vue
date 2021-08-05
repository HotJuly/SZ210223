<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      msg:"初始化数据"
    }
  },
  a:3,
  mounted(){
    // 通过vm.$options可以获取到组件的配置对象
    // console.log('App',this.$options.a)
    // console.log(c)
    // nextTick用处,将一会回调函数交给nextTick,该回调函数会在DOM更新之后执行
    // nextTick的底层原理就是通过then实现的微任务

    this.msg="我是修改之后的数据";
    // 这里应该隐藏着一个看不见的nextTick

    Promise.resolve().then(()=>{
      console.log('Promise1')
    })

    this.$nextTick(()=>{
      console.log('nextTick1')
    })

    this.$nextTick(()=>{
      console.log('nextTick2')
    })

    Promise.resolve().then(()=>{
      console.log('Promise2')
    })

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
