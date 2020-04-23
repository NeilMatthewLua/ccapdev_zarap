<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import M from 'materialize-css';
export default {
  name: "App",
  watch: {
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = from; 
              document.title = to.meta.title || 'Razap';
          }
      },
  },
  mounted() {
    M.AutoInit();
  }
}
</script>

<style>
  @import './assets/css/index.css'; 
  @import './assets/css/font.css'; 
</style>
