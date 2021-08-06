<template>
  <div id="app" class="A">
    <h1 ref="msg">{{msg}}</h1>
    <h2 v-once>{{form.name}}</h2>
    <!-- <h2>{{form.name | myFilter}}</h2> -->
    <!-- <input type="text" v-model="form.name"> -->
    <!-- <input type="text" :value="form.name" @input="(event)=>{form.name = event.target.value}"> -->

    <!-- <HelloWorld ref="helloworld" class="A" :value.sync="form.name" msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld :value="form.name" @update:value="(value)=>{form.name = value}" msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld ref="helloworld" class="A" v-model="form.name" msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld :value="form.name" @input="(value)=>{form.name = value}" msg="Welcome to Your Vue.js App"/> -->

    <HelloWorld ref="helloworld" class="A" :value.sync="form.name" msg="Welcome to Your Vue.js App">
      <template v-slot:default>
        <h1>大佐牛逼!!!</h1>
      </template>
       <template v-slot:huahua>
        <h1>华华牛逼!!!</h1>
      </template>
       <template v-slot:scope="{row}">
        <h1>{{row}}牛逼!!!</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

var mixin = {
  created: function () { console.log(1) }
}

export default {
  components: {
    HelloWorld
  },
  mixins:[mixin],
  provide:{
    sendMsg:"来自老父亲关爱"
  },
  data(){
    return {
      msg:"初始化数据",
      form:{
        name:123
      },
      test:"test111"
    }
  },
  a:3,
  mounted(){
    // console.log('App',this.$options.name)
    // 通过vm.$options可以获取到组件的配置对象
    // console.log('App',this.$options.a)
    // console.log(c)
    // nextTick用处,将一会回调函数交给nextTick,该回调函数会在DOM更新之后执行
    // nextTick的底层原理就是通过then实现的微任务

    // this.msg="我是修改之后的数据";
    // // 这里应该隐藏着一个看不见的nextTick
    //   // delete this.form.name;
    // setTimeout(()=>{
    //   // delete this.form.name;
    //   // console.log(this.form)
    //   this.$delete(this.form,"name")
    //   console.log(this.form)
    // },1000)

    // Promise.resolve().then(()=>{
    //   console.log('Promise1')
    // })

    // this.$nextTick(()=>{
    //   console.log('nextTick1')
    // })

    // this.$nextTick(()=>{
    //   console.log('nextTick2')
    // })

    // Promise.resolve().then(()=>{
    //   console.log('Promise2')
    // })

    // console.log(this.$data,JSON.parse(JSON.stringify(this.$data)))
    // console.log(this.$el)
    // console.log('children',this.$children[0])
    // this.$children[0]=null;
    console.log('$refs',this.$refs.msg,this.$refs.helloworld)
  },
  filters:{
    myFilter(value){
      return value + "hello"
    }
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
