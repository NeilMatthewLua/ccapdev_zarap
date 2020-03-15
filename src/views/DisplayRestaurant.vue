<template>
  <div>
    <Navbar :hasSearch="true" :isLogged="true" :hasFilter="true"/> 
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