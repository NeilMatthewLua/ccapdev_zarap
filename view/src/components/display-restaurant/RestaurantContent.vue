<template>
  <!--Restaurant Content-->
  <div>
    <!-- <transition name="changeContent" enter-active-class="animated fadeInUp"> -->
    <div class="main-content row" v-if="!isFetching && !noResult">
      <div class="left-section col s12 xl8">
        <!-- Title Card -->
        <div class="title-card row">
            <div class="col s12 m8">
              <h2>{{this.restoDetails.name}}</h2>
              <span class="post-rating #388e3c green white-text darken-2">{{this.restoDetails.overallRating}}</span>
              <h5 v-for="estTypes in this.restoDetails.establishmentType" :key="estTypes">{{estTypes}}</h5>
              <div v-show="!hasBeen">
                <div class="flex">
                  <a class="waves-effect waves-light red btn bookmark-btn" @click="beenHere()" v-show="isLogged">
                    I've Been Here
                  </a>
                  <div id="animated-example" class="animated bounce arrow-margin" v-show="isLogged"> <i class="material-icons">arrow_back</i></div>
                  <p class="notify" v-show="isLogged">Been Here? Tell us!</p>
                </div>
              </div>
              <div v-show="hasBeen">
                <a class="waves-effect waves-light green btn bookmark-btn" @click="notBeenHere()" v-show="isLogged">
                  <i class="material-icons left">bookmark</i>Been Here
                </a>
              </div>
            </div>
            <img class="title-picture col s12 m4" :src="this.defaultPic" alt="Picture">
        </div>
        <!-- Left Section Bottom (Either Photos or Review Section) -->
        <transition name="changeContent" enter-active-class="animated bounceInLeft"> 
          <div v-if="section === 'Photos'">
            <PhotoSection :urls="this.photoUrls" :name="this.restoDetails.name" :title="photosTitle"/>  
          </div>
        </transition> 
        <transition name="changeContent" enter-active-class="animated bounceInLeft">
          <div v-if="section === 'Review'">
            <ReviewSection @postedReview="postedReview"/> 
          </div>
        </transition> 
      </div>
      <!-- Right Section Content -->
      <div class="right-section col s12 xl4">
        <div class="content-selection row">
          <a @click="changeMenu" class="valign-wrapper center-align menu-buttons col s4"><h5 class="menu-text">Menu</h5></a>
          <a @click="changePhotos" class="valign-wrapper menu-buttons col s4"><h5 class="menu-text">Photos</h5></a>
          <a @click="changeReview" class="valign-wrapper menu-buttons col s4"><h5 class="menu-text">Review</h5></a>
        </div>
        <div class="content-details">
            <h4>Telephone Number:</h4>
            <h5>{{this.restoDetails.contactDetails}}</h5>
            <br> 
            <h4>Cuisines:</h4>
            <span v-for="cuisine in this.restoDetails.cuisines" :key="cuisine">{{cuisine + " "}}</span>
            <br> 
            <h4>Opening Hours:</h4>
            <h5 v-for="(value, name) in this.restoDetails.operatingHours" :key="name">{{name}} : {{value}}</h5>  
            <br> 
            <h4>Address:</h4>
            <h5>{{this.restoDetails.fullAddress}}</h5>
            <br> 
            <h4>Average Cost:</h4>
            <h5>{{this.restoDetails.costForTwo}}</h5>
            <br> 
        </div>
      </div>
    </div>
    <!-- </transition>  -->
    <div v-if="isFetching" class="loading">
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="150"
          color="#CB202D"
        />
    </div>
    <div class="loading" v-if="noResult">
      <h3>No Restaurant Found.</h3>
      <a class="hyperlink" @click="goToSearch()">Search for another restaurant</a>
    </div>
  </div>
  
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BreedingRhombusSpinner } from 'epic-spinners'
import PhotoSection from './PhotoSection.vue';
import ReviewSection from './ReviewSection.vue'; 
import router from '@/router';
export default {
    Name: "RestaurantContent",
    data() {
      return {
          photosTitle: "Menu", //Default Photos Title
          section: "Photos", //Default Section
          isFetching : true, //If Data is Fetching 
          noResult : false,
          search : null 
      }
    },
    computed: {
      //Gets Restaurant Details for Current Restaurant 
      restoDetails () {
        return this.fetchCurrResto(); 
      },
      //Gets Default Picture for Current Restaurant  
      defaultPic () {
        return this.$store.getters.fetchDefaultPic(this.restoDetails.defaultPicture).url;  
      }, 
      //Gets the Menu/Photo urls for Current Restaurant 
      photoUrls () {
        if(this.photosTitle === "Photos") 
          return this.fetchRestaurantPics();
        else 
          return this.fetchMenuPics();
      },
      //Gets the logged user, if exists
      isLogged () {
        return this.isLoggedIn();
      },
      hasBeen () {
        return (this.isLogged) ? this.$store.getters.getUser.beenHere.includes(this.fetchCurrResto().restaurantID) : false; 
      }
    },
    components: {
      PhotoSection,
      ReviewSection,
      BreedingRhombusSpinner
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
      },
      async goToSearch() {
        await this.getSearchRestos(this.search);
        await this.getSearch(this.search);
        router.push({path: '/searchresult', query: {search : this.search}}).catch(() => {});
      },
      beenHere() {
        if(!this.$store.getters.getUser.beenHere.includes(this.fetchCurrResto().restaurantID))
          this.$store.dispatch('addRestaurantVisit', {
              resto: this.fetchCurrResto().restaurantID,
              user: this.$store.getters.getUser
          })
          .then(async () => {
            await this.$store.dispatch('updateGetUser')
          })
      },
      notBeenHere() {
        if(!((this.isLogged) ? this.$store.getters.hasReview(this.getUser().userID) : false)) {
            if(this.$store.getters.getUser.beenHere.includes(this.fetchCurrResto().restaurantID))
          this.$store.dispatch('deleteRestaurantVisit', {
            resto: this.fetchCurrResto().restaurantID,
              user: this.$store.getters.getUser
          })
          .then(async () => {
            await this.$store.dispatch('updateGetUser')
          })
        } 
      },
      postedReview(value) {
        if(value == true)
          this.beenHere();
        else
          this.notBeenHere();
      },
      ...mapGetters(['fetchCurrResto','fetchMenuPics','fetchRestaurantPics', 'isLoggedIn', 'getUser']),
      ...mapActions(['getRestoById','getRestaurantPictures', 'getMenuPictures', 'getReviewPostUsers', 'getSearchRestos', 'getSearch'])
    },
    async created() {
      //Get Restaurant details 
      await this.getRestoById(this.$route.params.id); 
      let currResto = await this.$store.getters.fetchCurrResto;
      if(currResto != null) {
        await this.getRestaurantPictures(currResto.pictures); 
        await this.getMenuPictures(currResto.menu);  
        //Fetch the Reviews of the Restaurant 
        await this.getReviewPostUsers(currResto.reviews); 
      }
      else {
        this.noResult = true; 
      }
      this.isFetching = false;  
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
      height: 200px; 
      width: auto; 
  }

  .post-rating { 
      padding: 8px; 
  }

  .notify {
    margin-top: 25px; 
    font-size: 20px;
    margin-left: 5px; 
  }

  .flex {
    display: flex
  }

  .arrow-margin {
    margin-top: 25px; 
    margin-left: 25px; 
  }

  .animated {
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }

  @-webkit-keyframes bounce {
    0%, 100% {
      -webkit-transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-5px);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translatex(0);
    }
    50% {
      transform: translatex(-10px);
    }
  }

  .bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
  }

  hr {
    position: relative;
    top: 92px;
    left: -300px;
    width: 200px;
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

  .content-details > h5, span {
      font-size: 1.4rem !important; 
  }

  .loading {
      display: flex;
      flex-direction: column; 
      align-items: center;
      justify-content: center;
      height: 100vh;
  }

  .hyperlink {
    text-decoration: underline; 
    font-size: 2rem; 
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