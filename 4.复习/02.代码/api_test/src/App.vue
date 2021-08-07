<template>
  <div id="app" class="A">
    <router-view></router-view>
    <router-link to="/home">跳转到Home</router-link>
    <router-link to="/about">跳转到About</router-link>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  }
}
</script>

<style>
</style>
