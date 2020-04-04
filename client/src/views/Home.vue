<template>
  <div>
    <!-- Upper half of home page -->
    <div class ="BG-color">
      <!-- Navbar for home page -->
      <NavbarHome class="bring_front"/>

      <div class ="container pad4">
        <div class ="col s12 m2 valign-wrapper center-align">
          <p class ="z-depth-2 title colored-button">zarap</p>
        </div>
        <div class ="center">
          <p>Find the best restaurants in the metro and so much more</p>
        </div>
        <br>
        <!-- Search bar -->
        <div class ="row">
          <div class ="col s12" id="search_small">
            <div class ="input-field col s6 offset-s2 searchround">
              <input type="text" class ="white truncate padinput" name="searchbar" placeholder="Search your favorite restaurants here..." v-model="search">
            </div>
            <a class ="waves-effect waves-light btn pushdown colored-button bring_back" @click="goSearchResult()">search</a>
          </div>
        </div>
        <br>
        <br>
      </div>
    </div>
   
    <!-- Lower half -->
    <div class ="lowerhalf">
      <div class ="row">
        <div class ="col s11 offset-s1 card-small">
          <h3>Collections</h3>
          <p class ="truncate card_small">Explore curated lists of top restaurants, cafe, pubs, and bars in Metro Manila, based on trends</p>
        </div>
      </div>

      <!-- Restaurant cards -->
      <div class ="card-row row">
        <div class ="col s11 offset-s1 card_small">
          <div class ="col s12 m3 margin_right_5">
            <div class ="card BG-black-color mobile-height">
              <div class ="card-content white-text">
                <span class ="card-title">{{restaurantCards.restaurant_1.name}}</span>
                <p>{{this.restaurantCards.restaurant_1.establishmentType[0]}} | {{this.restaurantCards.restaurant_1.cuisines[0]}}</p>
              </div>
              <div class ="card-action">
                <a @click="goCard1()">View Restaurant</a>
              </div>
            </div>
          </div>
          <div class ="col s12 m3 margin_right_5" >
            <div class ="card BG-black-color mobile-height">
              <div class ="card-content white-text">
                  <span class ="card-title">{{restaurantCards.restaurant_2.name}}</span>
                  <p>{{this.restaurantCards.restaurant_2.establishmentType[0]}} | {{this.restaurantCards.restaurant_2.cuisines[0]}}</p>
              </div>
              <div class ="card-action">
                <a @click="goCard2()">View Restaurant</a>
              </div>
            </div>
          </div>
          <div class ="col s12 m3 margin_right_5 mobile-height" >
            <div class ="card BG-black-color mobile-height">
              <div class ="card-content white-text">
                  <span class ="card-title">{{restaurantCards.restaurant_3.name}}</span>
                  <p>{{this.restaurantCards.restaurant_3.establishmentType[0]}} | {{this.restaurantCards.restaurant_3.cuisines[0]}}</p>
              </div>
              <div class ="card-action">
                <a @click="goCard3()">View Restaurant</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer /> 
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue';
import NavbarHome from '@/components/NavbarHome.vue';
import router from '@/router'
import { mapActions } from 'vuex'; 

export default {
  name: 'Home',
  components: {
    Footer,
    NavbarHome
  },
  data() {
    return {
      search : null,
      restaurantCards : {
        restaurant_1 : {
          name: ' ',
          establishmentType: [''],
          cuisines: ['']
        }, 
        restaurant_2 : {
          name: ' ',
          establishmentType: [' '],
          cuisines: [' ']
        }, 
        restaurant_3 : {
          name: ' ',
          establishmentType: [' '],
          cuisines: [' ']
        }
      },
      featuredRestaurants: [ ]
    }
  },
  methods: {
    ...mapActions(['removeUnusedPictures', 'getSearchRestos', 'getSearch']), 
    goSearchResult: async function() {
      //TODO Search Router
      await this.getSearchRestos(this.search);
      await this.getSearch(this.search);
      router.push({path: '/searchresult', query: {search : this.search}}).catch(() => {});
      //For Dev
      //router.push({name:"Display Restaurant", params : {id : "5e7f0b024e652b3734b7e7e2"}})
    },
    loadCards: async function() {
      //loads the restaurant cards in home 
      await this.$store.dispatch('getRestoById', this.featuredRestaurants[0])
      this.restaurantCards.restaurant_1 = this.$store.getters.fetchCurrResto;
      await this.$store.dispatch('getRestoById', this.featuredRestaurants[1])
      this.restaurantCards.restaurant_2 = this.$store.getters.fetchCurrResto;
      await this.$store.dispatch('getRestoById', this.featuredRestaurants[2])
      this.restaurantCards.restaurant_3 = this.$store.getters.fetchCurrResto;
    },
    goCard1: function() {
      router.push({path: `restaurant/${this.restaurantCards.restaurant_1.restaurantID}`});
    },
    goCard2: function() {
      router.push({path: `restaurant/${this.restaurantCards.restaurant_2.restaurantID}`});
    },
    goCard3: function() {
      router.push({path: `restaurant/${this.restaurantCards.restaurant_3.restaurantID}`});
    },
    fetchFeatured: async function() {
      await this.$store.dispatch('getRestos')
      let restos = this.$store.getters.fetchAllRestos
      var set = [];
      for(let i = 0; i < 3; i++) 
      {
        let number = this.between(0, restos.length - 1, set);
        this.featuredRestaurants[i] = restos[number].restaurantID;
        set.push(number);
      }
      this.loadCards();
    },
    between: function (min, max, set) {
      let ans;
      let flag = 0;
      do {
        flag = 0;
        ans = Math.floor(
          Math.random() * (max - min + 1) + min
        )
        for(let i = 0; i < set.length && flag == 0; i++){
            if(ans == set[i])
              flag = 1;
        }
      } while(flag == 1) 
      return ans;
    }
  },
  mounted() {
    this.featuredRestaurants = [ ];
    this.fetchFeatured();
  }
}
</script>

<style scoped>

    .BG-color {
        background-color: var(--default-background-color);
    }

    .lowerhalf {
        background-color: var(--default-white-color);
    }

    .black-color {
        color:  var(--default-card-color) !important;
    }

    .bring_back {
        z-index: 0;
    }

    .bring_front {
        z-index: 1;
    }

    .BG-black-color {
        background-color: var(--default-card-color) !important;
    }

    .title {
        padding: 30px;
        color: white;
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
        border-radius: 15px;
    }

    .colored-button {
        background: var(--default-navbar-color) !important;
    }

    .pad4 {
        padding-top: 4%;
    }

    .center {
        text-align: center;
    }

    .navitem {
        padding-right: 25px;
    }

    .navitem {
        transition: all 0.4s ease-in-out;
    }

    .navitem:hover {
        transform: scale(1.1);
    }

    .pushdown {
        margin-top: 2%;
    }

    .boxed {
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid #2D2D2D;
        border-radius: 2px;
        margin-right: 55px;
    }

    .push-padding {
        padding-right: 2%;
        padding-top: 2%;
    }

    .searchround {
        margin-right: 20px;
    }

    .padinput {
        padding-left: 10px !important;
        box-sizing: border-box;
        border-radius: 4px !important;
    }

    .btn.pushdown {
        margin-top:17px;
    }

    .nav-flex-right {
        display: flex;
        float: right;
    }

    .margin_right_5 {
        margin-right: 5%;
    }

    .navright {
        display: flex; 
        flex-direction: row;
    }

    .navbar-right {
        display: flex; 
        flex-direction: row;
    }

    .pushdown-logged {
        padding-top: 30px;
    }

    .navbar-image {
        height: 40px; 
        margin-right: 10%; 
    }

    .dropdown-trigger {
        display: inline-block; 
    }

    .card {
        position: relative !important; 
    }

    .card-action {
        position: absolute !important; 
        bottom: 0; 
        width: 100%; 
    }

    .mobile-height {
        height: 15rem !important;
    }

    @media(max-width: 640px) {
        #search_small {
            display: flex;
            flex-direction: column;
        }

        #search_small div {
            display: flex;
            margin: 0; padding: 0;
            width: 100%;
        }

        #search_small button {
            display: flex;
            justify-items: center;
        }

        .card-small {
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }

    @media(max-width:1300px) {     
        .mobile-height {
          height: 20rem !important;
        }
    }
</style>