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
          <img class="title-picture col s12 m4" src="@/assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune">
      </div>
      <transition name="changeContent" enter-active-class="animated bounceInLeft"> 
        <div v-if="section === 'Photos'">
          <PhotoSection :title="photosTitle"/>  
        </div>
      </transition> 
      <transition name="changeContent" enter-active-class="animated bounceInLeft">
        <div v-if="section === 'Review'">
            <ReviewSection :hasReview="true"/> 
        </div>
      </transition> 
    </div>
    <div class="right-section col s12 xl4">
      <div class="content-selection row">
        <a @click="changeMenu" class="valign-wrapper center-align menu-buttons col s4"><h5 class="menu-text">Menu</h5></a>
        <a @click="changePhotos" class="valign-wrapper menu-buttons col s4"><h5 class="menu-text">Photos</h5></a>
        <a @click="changeReview" class="valign-wrapper menu-buttons col s4"><h5 class="menu-text">Review</h5></a>
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

  .delay {
      animation-delay: 0.3s; 
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

  .menu-buttons {
      height: 100%; 
      cursor: pointer; 
      text-align: center;
      width: 100%; 
      transition: background-color 0.5s ease-in-out;
  }

  .menu-text {
     margin: 0px; 
     width: 100%;  
     text-align: center; 
     font-size: 1.8rem; 
  }

  .menu-buttons:hover {
      background-color: var(--default-card-color); 
      color: var(--default-white-color); 
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