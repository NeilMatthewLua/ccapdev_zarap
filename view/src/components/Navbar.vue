<template>
  <div>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper row valign-wrapper">
      <a @click="goHome()" id="zarap" class="hide-on-med-and-down col valign-wrapper" v-bind:class="{s2 : hasSearch, left : hasSearch}">zarap</a>
      <!-- Navbar for Smaller Screens -->
      <div class = "hide-on-large-only" id="filter-mobile">
        <a @click="goHome()" id="zarap" class="brand-logo center">zarap</a>
        <a href="#" data-target="filter-choice" class="left sidenav-trigger" v-if="hasFilter"><i class="material-icons">swap_vert</i></a>
        <a href="#" data-target="slide-out" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>

      <!-- Searchbar -->
      <div class="search-section col s7 hide-on-med-and-down" v-show="hasSearch">
        <form class="search-bar" id="search-big" @submit.prevent="goSearchResult()">
          <div class="input-field">
            <input type="text" class="white search-box pad-left" v-model="search" name="searchbar" placeholder="   Search your favorite restaurants here...">
          </div>
        </form>
        <a class="waves-effect waves-light btn #e53935 red darken-1" @click="goSearchResult()">search</a>
      </div>    
      
      <!-- Unlogged Login Section -->
      <ul class="right hide-on-med-and-down col s3" v-show="!this.isLoggedIn">
        <div class="right">
          <li>
            <a @click="goLogin()"> Login </a>
          </li>
          <li>
            <a @click="goRegister()"> Register </a>
          </li>
        </div>
      </ul>

      <!-- Logged Profile Section -->
      <ul class="right hide-on-med-and-down col s3" v-show="this.isLoggedIn">
        <div class="right navbar-right valign-wrapper">
          <img class="circle navbar-image" :src= user_picture>
          <li>
            <a class="dropdown-trigger" href="#" data-target="dropdown1">
              <span class="white-text username"> Welcome,  {{user_firstname}}  </span>
              <i class="material-icons right"> arrow_drop_down </i>
            </a>
          </li>
        </div>
      </ul>
      </div> 
    </nav>

      <!-- Dropdown for Profile Section --> 
      <ul id="dropdown1" class="dropdown-content">
        <li><a @click="goMyProfile()" class="waves-effect">Profile</a></li>
        <div class="divider"></div>
        <li><a @click="goMyDining()" class="waves-effect" >Dining History</a></li>
        <div class="divider"></div>
        <li><a @click="goMyReviews()" class="waves-effect" >My Reviews</a></li>
        <div class="divider"></div>
        <li><a  @click="logout()"  class="waves-effect">Logout</a></li>
      </ul>
  </div>
  
  <!-- Sidebar Content Unlogged -->
    <ul id="slide-out" class="sidenav" v-if="!isLogged">
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a class="sidenav-close" @click="goRegister()" > Register </a>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a class="sidenav-close" @click="goLogin()"
        > Login </a>
      </li>
    </ul>

  <!-- Sidebar Logged --> 
  <ul id="slide-out" class="sidenav" v-else>
    <li>
      <div class="user-view">
        <div class="background"></div>
        <a>
          <img class="circle" :src= user_picture>
        </a>
        <a>
          <span class="username-sidenav">  {{user_firstname}}  </span>
        </a>
      </div>
    </li>
      <li><div class="divider"></div></li>
      <li><a @click="goMyProfile()" class="waves-effect sidenav-close">Profile</a></li>
      <li><div class="divider"></div></li>
      <li><a @click="goMyDining()" class="waves-effect sidenav-close" >Dining History</a></li>
      <li><div class="divider"></div></li>
      <li><a @click="goMyReviews()" class="waves-effect sidenav-close" >My Reviews</a></li>
      <li><div class="divider"></div></li>
      <li><a  class="waves-effect sidenav-close" @click="logout()">Logout</a></li>
  </ul>

  <!-- Filter -->
  <ul id="filter-choice" class="left sidenav" v-if="hasFilter">
    <li>
      <a href="#!" class="dropdown-trigger" data-target="sort-by"> Sort by
        <i class="material-icons right"> arrow_drop_down </i>
      </a>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#!" class="dropdown-trigger" data-target="location"> Location
        <i class="material-icons right"> arrow_drop_down </i>
      </a>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#!" class="dropdown-trigger" data-target="cuisine"> Cuisine
        <i class="material-icons right"> arrow_drop_down </i>
      </a>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#!" class="dropdown-trigger" data-target="establishment-type"> Establishment Type
        <i class="material-icons right"> arrow_drop_down </i>
      </a>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#!" class="dropdown-trigger" data-target="cost-for-two"> Cost for Two
        <i class="material-icons right"> arrow_drop_down </i>
      </a>
    </li>
    <li class="divider"></li>
    <li>
      <a @click="clearFilter()"> CLEAR FILTER
      </a>
    </li>
  </ul>

  <!-- Dropdown for Rating and Cost-->
  <ul id="sort-by" class="dropdown-content">
    <li v-for="n in sortList.length" :key="sortList[n-1].label+n" class="collection-item clickable" :class="{ 'isSelected' : sortToggles[n-1]}" @click="selectSort(n-1)">
        <a class="left" :class="{ 'textSelected' : sortToggles[n-1]}"> {{sortList[n-1].label}} </a>
        <div class="grey-text" :class="{ 'textSelected' : sortToggles[n-1]}"> &nbsp; {{sortList[n-1].option}} </div>
    </li>
  </ul>

  <!--Dropdown for Filter Location-->
  <ul id="location" class="dropdown-content">
    <li v-for="n in 6" :key="cityList[n-1].label" class="clickable" :class="{ 'isSelected' : cityToggles[n-1]}" @click="selectCity(n-1)">
        <a :class="{ 'textSelected' : cityToggles[n-1]}"> {{cityList[n-1].label}} City </a>
    </li>
    <li class="collection-item">
      <a class="modal-trigger" href="#navbar_modalloc"> See all location</a>
    </li>
  </ul>

  <div id="navbar_modalloc" class="modal">
    <div class="modal-content">
      <h4>Please choose your location</h4>
        <table>
          <tbody>
              <tr v-for="row in 5" :key="row">
                  <td v-for="index in 3" :key="index" class="clickable" :class="{ 'isSelected' : cityToggles[index - 1 + (3 * (row - 1))]}" @click="selectCity(index - 1 + (3 * (row - 1)))">
                      <a :class="{ 'textSelected' : cityToggles[index - 1 + (3 * (row - 1))]}"> {{cityList[index - 1 + (3 * (row - 1))].label}} City </a>
                  </td>
              </tr> 
              <tr>
                  <td v-for="index in 2" :key="index" class="clickable" :class="{ 'isSelected' : cityToggles[index - 1 + (3 * 5)]}" @click="selectCity(index - 1 + (3 * 5))">
                      <a :class="{ 'textSelected' : cityToggles[index - 1 + (3 * 5)]}"> {{cityList[index - 1 + (3 * 5)].label}} City </a>
                  </td>
              </tr> 
          </tbody>
        </table>
    </div>
  </div>

  <!-- Dropdown for Filter Cuisine -->
  <ul id="cuisine" class="dropdown-content">
    <li v-for="n in 6" :key="n" class="clickable" :class="{ 'isSelected' : cuisineToggles[n-1]}" @click="selectCuisine(n-1)">
        <a :class="{ 'textSelected' : cuisineToggles[n-1]}">{{cuisineList[n-1].label}} </a>
    </li>
    <li class="collection-item">
      <a class="modal-trigger" href="#navbar_modalcuisines"> See all cuisines</a>
    </li>
  </ul>

  <div id="navbar_modalcuisines" class="modal">
    <div class="modal-content">
      <h4>Please choose your cuisine</h4>
        <table>
          <tbody> 
              <tr v-for="row in 8" :key="row">
                  <td v-for="index in 3" :key="index" class="clickable" :class="{ 'isSelected' : cuisineToggles[index - 1 + (3 * (row - 1))]}" @click="selectCuisine(index - 1 + (3 * (row - 1)))">
                      <a :class="{ 'textSelected' : cuisineToggles[index - 1 + (3 * (row - 1))]}"> {{cuisineList[index - 1 + (3 * (row - 1))].label}}</a>
                  </td>
              </tr> 
              <tr>
                  <td v-for="index in 2" class="clickable" :key="index" :class="{ 'isSelected' : cuisineToggles[index - 1 + (3 * 8)]}" @click="selectCuisine(index - 1 + (3 * 8))">
                      <a :class="{ 'textSelected' : cuisineToggles[index - 1 + (3 * 8)]}"> {{cuisineList[index - 1 + (3 * 8)].label}}</a>
                  </td>
              </tr>
          </tbody>
        </table>
    </div>
  </div>

  <!-- Dropdown for Filter Establishment Type -->
  <ul id="establishment-type" class="dropdown-content">
    <li v-for="n in estList.length" :key="estList[n-1].label"
        class="clickable" :class="{ 'isSelected' : estToggles[n-1]}" @click="selectEstType(n-1)">
        <a :class="{ 'textSelected' : estToggles[n-1]}" > {{estList[n-1].label}} </a>
    </li>
  </ul>

  <!-- Dropdown for Filter Cost for two -->
  <ul id="cost-for-two" class="dropdown-content">
    <li v-for="n in costList.length" :key="costList[n-1].label"
        class="clickable" :class="{ 'isSelected' : costToggles[n-1]}" @click="selectCostFilter(n-1)"  >
        <a :class="{ 'textSelected' : costToggles[n-1]}"> {{costList[n-1].label}} </a>
    </li>

  </ul>

  <!--Search Bar for Smaller Screens-->
  <div v-show="hasSearch">
    <div class="search-section search-mobile hide-on-large-only">
      <div class="container row">
        <div class="col s12">
          <form class="search-bar-small" id="search-small" @submit.prevent="goSearchResult()"> 
            <div class="input-field">
              <input type="text" class="white search-box truncate" v-model="search" name="searchbar" placeholder="   Search your favorite restaurants here...">
            </div>
          </form>
        </div>
      </div>
      <div class="container row bring_back">
        <div class="col s12">
          <a class="waves-effect waves-light btn #e53935 red darken-1" @click="goSearchResult()">search</a>
        </div>
      </div>
    </div>
  </div>
    <alertModal                
      :message= "message" 
      v-show="isModalVisible"
      @close="closeModal"
      class="bring_front"
    />
    <div class="loadModal" v-if="loading">
      <loadModal/>
    </div>
</div>
</template>

<script>
import M from 'materialize-css';
import router from '../router';
import alertModal from '@/components/alertModal';
import { mapActions, mapMutations, mapGetters } from 'vuex'; 
import loadModal from '@/components/loadModal'; 
export default {
  Name: "Navbar",
  components: {
      alertModal, 
      loadModal
  },
  props:{
    hasSearch: Boolean, //If search bar is present 
    hasFilter: Boolean,
  },
  computed: {
    isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
    },
    cityToggles() {
        return (this.update || !this.update) ? this.fetchCityToggles() : this.fetchCityToggles();
    }, 
    cuisineToggles() {
        return (this.update || !this.update) ? this.fetchCuisineToggles() : this.fetchCuisineToggles();
    },
    estToggles() {
        return (this.update || !this.update) ? this.fetchEstToggles() : this.fetchEstToggles(); 
    },
    costToggles() {
        return (this.update || !this.update) ? this.fetchCostToggles() : this.fetchCostToggles(); 
    },
    sortToggles() {
        return (this.update || !this.update) ? this.fetchSortToggles() : this.fetchSortToggles(); 
    }
  },
  methods: {
    ...mapGetters(["fetchFilters", "fetchSortToggles", "fetchCityToggles", "fetchCuisineToggles", "fetchEstToggles", "fetchCostToggles"]), 
    ...mapMutations(["setIsLoading", "toggleFilterSort","toggleFilterCity","toggleFilterCuisine","toggleFilterCost","toggleFilterEst", "updateFilteredRestaurants","clearFilter"]),
    ...mapActions(['removeUnusedPictures', 'getSearchRestos', 'getSearch',"updateFilter"]),  
    showModal() { //confirmation of successful registration
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
        router.push({name: "Home"});
    },
    checkLogged() {
        if(this.$store.getters.isLoggedIn) {
          this.user = this.$store.getters.getUser;
          this.user_picture = this.$store.getters.getPicture['url'];
          this.user_firstname = this.user.name.split(" ")[0];
          this.isLogged = true;
        }
    },
    async logout() {
      await this.removeUnusedPictures();
      this.$emit("logout"); 
      this.$store.dispatch('logout')
      .then(() => {
        this.isLogged= false;
      })
      this.showModal();
    },
    goHome() {
      router.push({name:"Home"})
    },
    goMyReviews() {
      router.push({path:`/userdetail/${this.user.userID}/review`}).catch(() => {}); 
    },
    goMyDining() {
      router.push({path: `/userdetail/${this.user.userID}/dining`}).catch(() => {});
    },
    goMyProfile() {
      router.push({path: `/userdetail/${this.user.userID}/myprofile`}).catch(() => {});
    },
    goLogin() {
      router.push({name: 'Login'}).catch(() => {});
    },
    goRegister() {
      router.push({name: 'Register'}).catch(() => {});
    },
    async goSearchResult() {
      this.setIsLoading(true);
      this.clearFilter(); 
      await this.getSearch(this.search);
      await this.getSearchRestos(this.search);
      this.setIsLoading(false); 
      if (this.$router.name == "Search Result") {
        router.push({path: '/searchresult', query: {search : this.search}}).catch(() => {});
        this.search = "";
      }
      else {
        router.push({path: '/searchresult', query: {search : this.search}}).catch(() => {});
        this.search = "";
      }
    },
    selectCity(index) {
        this.update = !this.update;
        let payload = [
            index, 
            this.cityList[index].label
        ]
        this.toggleFilterCity(payload); 
        this.updateFilters(); 
    },
    selectCuisine(index) {
        this.update = !this.update;
        let payload = [
            index, 
            this.cuisineList[index].label
        ]
        this.toggleFilterCuisine(payload); 
        this.updateFilteredRestaurants();
    },
    selectCostFilter(index) {
        this.update = !this.update;
        let payload = [
            index,
            this.costList[index].low, 
            this.costList[index].upper
        ]
        this.toggleFilterCost(payload); 
        this.updateFilteredRestaurants();
    },
    selectSort(index) {
        this.update = !this.update; 
        let payload = [
            index,
            this.sortList[index].label, 
            this.sortList[index].order
        ]
        this.toggleFilterSort(payload); 
        this.updateFilteredRestaurants(); 
    },
    selectEstType(index) {
        this.update = !this.update;
        let payload = [
            index,
            this.estList[index].label
        ]
        this.toggleFilterEst(payload); 
        this.updateFilteredRestaurants();
    },
    async updateFilters() {
      this.updateFilteredRestaurants(); 
    },
  },
  async mounted() {
    await this.$store.dispatch('login_check');
    this.checkLogged();
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function() {
      // sidenav
      var elem = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elem, {});
      // modal
      var elems = document.querySelectorAll('.modal');
      M.Modal.init(elems, {});
      // dropdown
      var elem_dropdown = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elem_dropdown, {
        coverTrigger: false
      });
    });
  },
  data() {
    return {
      loading : false, 
      user: null,
      isModalVisible: false,
      message: "You're logged out! Taking you back to home page....",
      isLogged: false,
      user_firstname: ' ',
      user_picture: ' ',
      search: null,
      update : false, 
      sortList: [
          {label:"Rating", option : " - high to low", order: -1},
          {label:"Cost", option : " - high to low", order: -1},
          {label:"Cost", option : " - low to high", order: 1}
      ],
      cityList: [
          {label: "Quezon"},
          {label: "Manila"},
          {label: "Makati"},
          {label: "Pasig"},
          {label: "Taguig"},
          {label: "Mandaluyong"},
          {label: "Parañaque"},
          {label: "Pasay"},
          {label: "Muntinlupa"},
          {label: "Las Piñas"},
          {label: "Marikina"},
          {label: "San Juan"},
          {label: "Caloocan"},
          {label: "Valenzuela"},
          {label: "Malabon"},
          {label: "Navotas"},
          {label: "Pateros"}
      ],
      cuisineList: [
          {label: "American"},
          {label: "Asian"},
          {label: "BBQ"},
          {label: "Bakery"},
          {label: "Bar Food"},
          {label: "Beverages"},
          {label: "Bubble Tea"},
          {label: "Burger"},
          {label: "Chinese"},
          {label: "Coffee"},
          {label: "Desserts"},
          {label: "Fast Food"},
          {label: "Filipino"},
          {label: "Healthy Food"},
          {label: "Hotpot"},
          {label: "International"},
          {label: "Italian"},
          {label: "Japanese"},
          {label: "Korean"},
          {label: "Korean BBQ"},
          {label: "Pizza"},
          {label: "Ramen"},
          {label: "Salad"},
          {label: "Seafood"},
          {label: "Street Food"},
          {label: "Tea"},
      ],
      estList: [
          {label: "Quick Bites",isSelected: false},
          {label: "Casual Dining"},
          {label: "Kiosks"},
          {label: "Cafés"},
          {label: "Food Courts"},
          {label: "Bakeries",isSelected: false},
          {label: "Dessert Parlor"},
          {label: "Bars"},
          {label: "Fine Dining"},
      ],
      costList:[
          {label: "Less than PHP350", low : 0, upper : 349},
          {label: "PHP350 to PHP700", low : 350, upper : 699},
          {label: "PHP700 to PHP1400", low : 700, upper : 1399},
          {label: "PHP1400 +", low : 1400, upper : -1},
      ]
    }
  }
}
</script>

<style scoped>
  :root {
      --default-nav-background: #CB202D;
      --default-font-color: #2D2D2D; 
  }

  #zarap {
      padding-left:20px;  
      font-size: 30px; 
  } 
    
  nav {
      height: 80px;
  }
      
  .bring_back {
      z-index: 0;
  }

  .bring_front {
      z-index: 1;
  }
    
  .nav-wrapper {
      background-color: var(--default-nav-background); 
      padding: 10px; 
  }

  .navbar-fixed {
      height: 80px;  
      z-index: 10 !important; 
  }

  .search-section {
      display: inline-block; 
      text-align: center;
  }

  .search-mobile {
      width: 100%;
  }

  .search-section.valign-wrapper {
      width: 100%; 
      line-height: 80px; 
  }

  .search-bar { 
      width: 30vw !important; 
      margin-right: 2vw !important; 
      display: inline-block; 
  }

  .search-bar-small {
      width: 80vw !important; 
      vertical-align: middle;
  }

  .search-bar-small + a {
      width: 20vw !important;
      vertical-align: middle; 
  }

  .search-bar-small > .input-field > .truncate {
      padding-right: 10px; 
  }

  .search-mobile > .container > .col > .btn {
      width: 100%; 
  }

  .search-box {
      border:5px; 
      border-color: #2D2D2D; 
      border-radius: 10px !important; 
      z-index: 5px; 
  }

  .sidenav-overlay {
      z-index: 9 !important;  
  }

  .search-section > .container > .col > .btn {
      z-index: 0 !important; 
  }

  .navbar-right {
      display: flex; 
      flex-direction: row;
  }

  .navbar-image {
      height: 50px; 
      width: 50px; 
  }

  .username {
      display: inline-block; 
  }

  .username-sidenav {
      color: var(--default-font-color); 
  }

  #filter-mobile {
    width: 100vw;
  }

  .pad-left {
    padding-left: 15px !important;
  }

  .clickable {
        cursor: pointer; 
    }

  .isSelected {
      background-color: #4caf50 !important;   
  }

  .textSelected {
      color: var(--default-background-color) !important; 
  }

  td {
      text-align: center; 
  }
</style>