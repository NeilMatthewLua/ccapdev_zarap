<template>
  <div>
    <Navbar :hasSearch="true" :hasFilter="false"/> 
    <RestaurantContent @upload-files="uploadFiles"/> 
    <Footer /> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantContent from '@/components/display-restaurant/RestaurantContent.vue';
import { mapActions } from 'vuex';   
export default {
    name: "DisplayRestaurant",
    components: {
        Navbar, 
        Footer, 
        RestaurantContent
    },
    data() {
      return {
        uploadedFiles: []
      }
    },
    methods: {
      ...mapActions(['removeUnusedPictures']),
      uploadFiles(files) {
        this.$set(this, 'uploadedFiles', files); 
      }
    },
    async beforeRouteLeave(to, from, next) {  
        if(this.$store.getters.getUser != null){
          await this.removeUnusedPictures();
        }
        next()
    },
}
</script>

<style scoped>
</style>