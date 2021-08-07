<template>
  <div id="app" class="A">
    <router-view></router-view>
    <router-link to="/home">跳转到Home</router-link>
    <router-link to="/about">跳转到About</router-link>
    <button @click="toAbout">跳转到About</button>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  methods:{
    toAbout(){
      this.$router.push('/about')
    }
  }
}
</script>

<style>
</style>
