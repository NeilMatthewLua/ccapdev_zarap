<template>
  <div>
    <Navbar :hasSearch="true" :isLogged="false"/> 
    <Footer /> 
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Navbar, 
    Footer
  }
}
</script>
