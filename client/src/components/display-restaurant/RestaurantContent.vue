<template>
  <!--Restaurant Content-->
  <div class="main-content row">
    <div class="left-section col s12 xl8">
      <div class="title-card row">
          <div class="col s12 m8">
            <h2><b>Golden Fortune</b></h2>
            <h5>Chinese Food | Fine Dining</h5>
            <a class="waves-effect waves-light red btn bookmark-btn"><i class="material-icons left">bookmark</i>Been Here</a>
          </div>
          <img class="title-picture col s12 m4" src="../../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune">
      </div>
      <div v-if="section === 'Photos'">
        <PhotoSection :title="photosTitle"/>  
      </div>
      <div v-else>
        <ReviewSection :hasReview="false"/> 
      </div>
    </div>
    <div class="right-section col s12 xl4">
      <div class="content-selection row">
        <a @click="changeMenu" class="menu col s4">Menu</a>
        <a @click="changePhotos" class="photos col s4">Photos</a>
        <a @click="changeReview" class="review col s4">Review</a>
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
import PhotoSection from './PhotoSection.vue'; 
import ReviewSection from './ReviewSection.vue'; 
export default {
    Name: "RestaurantContent",
    data() {
      return {
          photosTitle: "Photos", //Default Photos Title
          section: "Review" //Default Section 
      }
    },
    components: {
      PhotoSection,
      ReviewSection 
    },
    methods: { 
      changeMenu() {
        this.section = "Photos";
        this.photosTitle = "Menu"; 
      }, 
      changePhotos() {
        this.section = "Photos"; 
        this.photosTitle = "Photos"; 
      }, 
      changeReview() {
        this.section = "Review"
      }
    }
}
</script>

<style scoped>
  html,body {
    width: 100vw; 
  }

  .main-content {
      margin-top: 40px; 
      padding: 20px; 
      display: flex; 
      flex-direction: row; 
      width: 100%; 
  }

  .left-section {
      display: flex;
      flex-direction: column;
      margin-right: 20px; 
  }

  .title-card {
      width: 100%; 
      margin-top:10px; 
      margin-bottom: 20px; 
      margin-left: 5px !important;   
      padding: 15px;   
      background-color: var(--default-restaurantcard-color);
  }

  .title-card > .title-picture {
      padding-top: 10px; 
      padding-bottom: 10px; 
      height: 80%; 
      width: auto; 
  }

  .title-card > .col > .btn {
      z-index: 0 !important
  }

  .review-btn-text { 
      position: relative; 
      top: -5px; 
  }

  .review-icons {
      color: white; 
  }

  .bookmark-btn {
      margin: 20px 0px; 
      z-index: 0 !important;
  }

  .photos {
      text-align: center;
      width: 100%; 
  }

  .carousel-container {
      padding: 20px; 
      background-color: var(--default-restaurantcard-color);
      margin-bottom: 40px; 
      height: auto; 
  }

  .carousel {
      height: 100%; 
      overflow-x:hidden;
      overflow-y: scroll;
  }

  .carousel-item {
      height: 100%; 
      width: 100%; 
  }

  .right-section {
      display: flex; 
      flex-direction: column;
      padding: 0px !important;  
  }

  .content-selection {
      display: flex; 
      align-items: center; 
      margin-top: 10px; 
      margin-left: 0px !important;
      margin-bottom: 60px; 
      height: 100px; 
      width: 100%; 
      background-color: var(--default-restaurantcard-color);   
      vertical-align: middle;
  }

  .content-selection > a {
      font-size: 1.8rem; 
      color: var(--default-text-color); 
      text-align: center; 
  }

  .content-details {
      padding: 20px; 
      background-color: var(--default-restaurantcard-color);
  }

  .content-details > h4 + h5 {
      color: var(--default-text-color); 
  }

  .content-details > h4 {
      font-size: 1.8rem !important; 
  }

  .content-details > h5 {
      font-size: 1.2rem !important; 
  }

  @media screen and (min-width: 1201px) {
      .title-card {
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
              -ms-flex-align: center;
                  align-items: center;
      }
  }

  @media screen and (max-width: 1200px) {
      .main-content {
          flex-direction: column;
          margin-top: 40px; 
      }
      .title-card {
          margin-bottom: 40px; 
      }
      .left-section {
          margin: 0px; 
          padding: 0px !important; 
      }
      .content-selection {
          margin-bottom: 40px !important;
      }
  }
</style>