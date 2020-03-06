<template>
  <!--Restaurant Content-->
  <div class="main-content row">
    <div class="left-section col s12 xl8">
      <div class="title-card row">
          <div class="col s12 m8">
            <h2><b>Golden Fortune</b></h2>
            <h5>Chinese Food | Fine Dining</h5>
            <a class="waves-effect waves-light red btn"><i class="material-icons left">bookmark</i>Been Here</a>
          </div>
          <img class="title-picture col s12 m4" src="../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune">
      </div>
      <div v-if="section === 'Photos'">
        <PhotoSection :title="photosTitle"/>  
      </div>
      <div v-else>
        <ReviewSection /> 
      </div>
    </div>
    <div class="right-section col s12 xl4">
      <div class="content-selection row">
        <a href="" class="menu col s4">Menu</a>
        <a href="" class="photos col s4">Photos</a>
        <a href="" class="review col s4">Review</a>
      </div>
      <div class="content-details">
          <h4>Telephone Number:</h4>
          <h5>+552 3877</h5>
          <br> 
          <h4>Cuisines:</h4>
          <h5>Asian</h5>
          <br> 
          <h4>Opening Hours:</h4>
          <h5>6:00AM - 8:00PM</h5>
          <br> 
          <h4>Address:</h4>
          <h5>678 Kalaw Ave.</h5>
          <br> 
          <h4>Average Cost:</h4>
          <h5>P1200</h5>
          <br> 
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import PhotoSection from './PhotoSection.vue'; 
import ReviewSection from './ReviewSection.vue'; 
export default {
    Name: "RestaurantContent",
    data() {
        return {
            photosTitle: "Photos",
            section: "Review"
        }
    },
    components: {
        PhotoSection,
        ReviewSection 
    },
    mounted() {
        M.AutoInit(); 
    }
}
</script>

<style scoped>
  @import '../assets/css/view-restaurant.css';
</style>