<template>
  <div>
    <Navbar :hasSearch="true" :hasFilter="false"/> 
    <RestaurantContent /> 
    <Footer /> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantContent from '@/components/display-restaurant/RestaurantContent.vue'; 
export default {
    name: "DisplayRestaurant",
    components: {
        Navbar, 
        Footer, 
        RestaurantContent
    }
}
</script>

<style scoped>
</style>