<template>
  <div class="hello">
    <h1 v-pre>{{ msg }}</h1>
    <h3>{{sendMsg}}</h3>
    <input type="text" :value="value" @input="changeValue">
    <!-- 需要进行A和B组件之间的切换 -->
    <!-- <A v-if="flag"></A>
    <B v-else></B> -->
    <!-- <component :is="com"></component> -->
    <slot name="default"></slot>
    <slot name="huahua"></slot>
    <slot name="scope" :row="sendMsg"></slot>
    <button @click="deleteCom">删除HelloWorld</button>
  </div>
</template>

<script>
import A from './A.vue'
import B from './B.vue'
export default {
  name: 'HelloWorld',
  data(){
    return {
      com:A
    }
  },
  props: {
    msg: String,
    value:String|Number,
    formName:String|Number,
  },
  inject:["sendMsg"],
  a:5,
  model:{
    event:"input123",
    prop:"formName"
  },
  methods:{
    changeValue(event){
      // console.log('event',event)
      var value = event.target.value;
      // this.value = value;
      // this.$emit('input123',value)
      this.$emit('update:value',value)
    },
    deleteCom(){
      console.log('deleteCom')
      // destory的用处仅仅是将当前组件所有响应式全部断开,也就是说你后续对该组件进行任何修改,都不会影响到页面展示效果
      // this.$destroy();
      this.com=B;
    }
  },
  mounted(){
    console.log('test',this.$parent.test)
    console.log('root',this.$root === this.$parent)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
