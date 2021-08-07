<template>
  <div id="app" class="A">
    <ul>
      <li v-for="(item,index) in arr" :key="item">
        <label>{{item}}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="addItem">修改arr</button>
  </div>
</template>

<script>

export default {
  data(){
    return {
      arr:[1,2,3,4]
    }
  },
  methods:{
    addItem(){
      this.arr.splice(2,0,6);
    }
  }
}
</script>

<style>
</style>
