<template>
  <div>
    <Navbar :hasSearch="true" :isLogged="true" :hasFilter="false"/> 
    <RestaurantContent /> 
    <Footer /> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantContent from '@/components/display-restaurant/RestaurantContent.vue';
// import { mapGetters } from 'vuex'; 
export default {
    name: "DisplayRestaurant",
    components: {
        Navbar, 
        Footer, 
        RestaurantContent
    }
    // computed: {
    //   ...mapGetters([
    //   'getEvents',
    // ])
    // }, 
    // mounted() {
    //   this.getEvents(); 
    // }
}
</script>

<style scoped>
</style>