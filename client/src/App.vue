<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import M from 'materialize-css';
export default {
  mounted() {
    M.AutoInit();
  }
}
</script>

<style>
  @import './assets/css/index.css'; 
  @import './assets/css/font.css'; 
</style>
