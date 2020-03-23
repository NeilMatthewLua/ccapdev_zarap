<template>
  <div>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper row valign-wrapper">
      <a href="/" id="zarap" class="hide-on-med-and-down col valign-wrapper" v-bind:class="{s2 : hasSearch, left : hasSearch}">zarap</a>
      <!-- Navbar for Smaller Screens -->
      <div class = "hide-on-large-only" id="filter-mobile">
        <a href="/" id="zarap" class="brand-logo center">zarap</a>
        <a href="#" data-target="filter-choice" class="left sidenav-trigger" v-if="hasFilter"><i class="material-icons">swap_vert</i></a>
        <a href="#" data-target="slide-out" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>

      <!-- Searchbar -->
      <div class="search-section col s7 hide-on-med-and-down" v-show="hasSearch">
        <form class="search-bar">
          <div class="input-field">
            <input type="text" class="white search-box" name="searchbar" placeholder="   Search your favorite restaurants here...">
          </div>
        </form>
        <a class="waves-effect waves-light btn #e53935 red darken-1" href="/searchresult">search</a>
      </div>    
      
      <!-- Unlogged Login Section -->
      <ul class="right hide-on-med-and-down col s3" v-if="!isLogged">
        <div class="right">
          <li>
            <a href="/login"> Login </a>
          </li>
          <li>
            <a href="/register"> Register </a>
          </li>
        </div>
      </ul>

      <!-- Logged Profile Section -->
      <ul class="right hide-on-med-and-down col s3" v-else>
        <div class="right navbar-right valign-wrapper">
          <img class="circle navbar-image" src="@/assets/pictures/jonal.jpg">
          <li>
            <a class="dropdown-trigger" href="#" data-target="dropdown1">
              <span class="white-text username"> Welcome, Jonal </span>
              <i class="material-icons right"> arrow_drop_down </i>
            </a>
          </li>
        </div>
      </ul>
      </div> 
    </nav>
    <!-- Dropdown for Profile Section --> 
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="/userdetail/profile" class="black-text" >My Profile</a></li>
      <li class="divider"></li>
      <li><a href="/userdetail/dining" class="black-text" >Dining History</a></li>
      <li class="divider"></li>
      <li><a href="/userdetail/review" class="black-text" >My Reviews</a></li>
      <li class="divider"></li>
      <li><a href="/userdetail" class="black-text">Logout</a></li>
    </ul>
  </div>
  
  <!-- Sidebar Content Unlogged -->
  <ul id="slide-out" class="sidenav" v-if="!isLogged">
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <a href="/register"> Register </a>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <a href="/login"> Login </a>
    </li>
  </ul>

  <!-- Sidebar Logged --> 
  <ul id="slide-out" class="sidenav" v-else>
    <li>
      <div class="user-view">
        <div class="background"></div>
        <a href="/userdetail/:menu">
          <img class="circle" src="@/assets/pictures/jonal.jpg">
        </a>
        <a href="/userdetail/:menu">
          <span class="username-sidenav"> Jonal </span>
        </a>
      </div>
    </li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/profile" class="waves-effect">Profile</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/dining" class="waves-effect" >Dining History</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/review" class="waves-effect" >My Reviews</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/review" class="waves-effect" >Logout</a></li>
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
  </ul>

  <!-- Dropdown for Rating and Cost-->
  <ul id="sort-by" class="dropdown-content">
    <li v-for="navbar_sort in nav_sort_by" v-bind:key="navbar_sort.id">
      <a href="#"> {{navbar_sort.label}}{{navbar_sort.option}} </a>
    </li>
  </ul>

  <!--Dropdown for Filter Location-->
  <ul id="location" class="dropdown-content">
    <li v-for="navbar_location in nav_locations" v-bind:key="navbar_location.id">
      <a href="#"> {{navbar_location.label}} </a>
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
              <tr>
                  <td>
                      <a href="#"> Quezon City </a>
                  </td>
                  <td>
                      <a href="#"> Manila </a>
                  </td>
                  <td>
                      <a href="#"> Makati City </a>
                  </td>                                    
              </tr>
              <tr>
                  <td>
                      <a href="#"> Pasig City </a>
                  </td>
                  <td>
                      <a href="#"> Taguig City </a>
                  </td>
                  <td>
                      <a href="#"> Mandaluyong City </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Parañaque City </a>
                  </td>
                  <td>
                      <a href="#"> Pasay City </a>
                  </td>
                  <td>
                      <a href="#"> Muntinlupa City </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Las Piñas City </a>
                  </td>
                  <td>
                      <a href="#"> Marikina City </a>
                  </td>
                  <td>
                      <a href="#"> San Juan City </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Caloocan City </a>
                  </td>
                  <td>
                      <a href="#"> Valenzuela City </a>
                  </td>
                  <td>
                      <a href="#"> Malabon City </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Navotas </a>
                  </td>
                  <td>
                      <a href="#"> Pateros City </a>
                  </td>
              </tr>
          </tbody>
        </table>
    </div>
  </div>

  <!-- Dropdown for Filter Cuisine -->
  <ul id="cuisine" class="dropdown-content">
    <li v-for="navbar_cuisine in nav_cuisines" v-bind:key="navbar_cuisine.id">
      <a href="#"> {{navbar_cuisine.label}} </a>
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
              <tr>
                  <td>
                      <a href="#"> American </a>
                  </td>
                  <td>
                      <a href="#"> Asian </a>
                  </td>
                  <td>
                      <a href="#"> BBQ </a>
                  </td>                                    
              </tr>
              <tr>
                  <td>
                      <a href="#"> Bakery </a>
                  </td>
                  <td>
                      <a href="#"> Bar Food </a>
                  </td>
                  <td>
                      <a href="#"> Beverages </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Bubble Tea </a>
                  </td>
                  <td>
                      <a href="#"> Burger </a>
                  </td>
                  <td>
                      <a href="#"> Chinese </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Coffee </a>
                  </td>
                  <td>
                      <a href="#"> Desserts </a>
                  </td>
                  <td>
                      <a href="#"> Fast Food </a>
                  </td> 
              </tr>
              <tr>
                  <td>
                      <a href="#"> Filipino </a>
                  </td> 
                  <td>
                      <a href="#"> Healthy Food </a>
                  </td>
                  <td>
                      <a href="#"> Hotpot </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href="#"> International </a>
                  </td> 
                  <td>
                      <a href="#"> Italian </a>
                  </td>
                  <td>
                      <a href="#"> Japanese </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href="#"> Korean </a>
                  </td>
                  <td>
                      <a href="#"> Korean BBQ </a>
                  </td>
                  <td>
                      <a href="#"> Pizza </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href="#"> Ramen </a>
                  </td>
                  <td>
                      <a href="#"> Salad </a>
                  </td>
                  <td>
                      <a href="#"> Seafood </a>
                  </td>
              </tr>
            <tr>
                <td>
                    <a href="#"> Street Food </a>
                </td>
                <td>
                    <a href="#"> Tea </a>
                </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>

  <!-- Dropdown for Filter Establishment Type -->
  <ul id="establishment-type" class="dropdown-content">
    <li v-for="navbar_establishment in nav_establishment_types" v-bind:key="navbar_establishment.id">
      <a href="#"> {{navbar_establishment.label}} </a>
    </li>
  </ul>

  <!-- Dropdown for Filter Cost for two -->
  <ul id="cost-for-two" class="dropdown-content">
    <li v-for="navbar_cost in nav_cost_two" v-bind:key="navbar_cost.id">
      <a href="#"> {{navbar_cost.label}} </a>
    </li>

  </ul>

  <!--Search Bar for Smaller Screens-->
  <div v-show="hasSearch">
    <div class="search-section search-mobile hide-on-large-only">
      <div class="container row">
        <div class="col s12">
          <form class="search-bar-small"> 
            <div class="input-field">
              <input type="text" class="white search-box truncate" name="searchbar" placeholder="   Search your favorite restaurants here...">
            </div>
          </form>
        </div>
      </div>
      <div class="container row">
        <div class="col s12">
          <a class="waves-effect waves-light btn #e53935 red darken-1" href="/searchresult">search</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import M from 'materialize-css';

export default {
  Name: "Navbar",
  props:{
    hasSearch: Boolean, //If search bar is present 
    isLogged: Boolean, //If user is logged in 
    hasFilter: Boolean,
  },
  computed: {
    isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
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
      nav_sort_by: {
        nav_ratings:{
            label: "Rating",
            option: " - high to low"
        },
        nav_costasc:{
            label: "Cost",
            option: " - high to low"
        },
        nav_costdes:{
            label: "Cost",
            option: " - low to high"
        }
      },
      nav_locations: {
          nav_manila: {
              label: "Manila"
          },
          nav_quezon: {
              label: "Quezon City"
          },
          nav_makati: {
              label: "Makati City"
          },
          nav_pasig: {
              label: "Pasig City"
          },
          nav_pasay: {
              label: "Pasay City"
          },
          nav_paranaque: {
              label: "Parañaque City"
          },
          nav_taguig: {
              label: "Taguig City"
          }
          // nav_others: {
          //     label: "See all locations"
          // }
      },
      nav_cuisines: {
          nav_filipino: {
              label: "Filipino"
          },
          nav_beverages: {
              label: "Beverages"
          },
          nav_american: {
              label: "American"
          },
          nav_fastfood: {
              label: "Fastfood"
          },
          nav_chinese: {
              label: "Chinese"
          },
          nav_coffee: {
              label: "Coffee"
          },
          nav_bakery: {
              label: "Bakery"
          },
          nav_tea: {
              label: "Tea"
          },
          nav_street: {
              label: "Street Food"
          },
          nav_japanese: {
              label: "Japanese"
          }
          // nav_others: {
          //     label: "See all cuisines"
          // }
      },
      nav_establishment_types: {
          nav_quick: {
              label: "Quick Bites"
          },
          nav_casual: {
              label: "Casual Dining"
          },
          nav_beverage: {
              label: "Beverage Shops"
          },
          nav_kiosks: {
              label: "Kiosks"
          },
          nav_cafes: {
              label: "Cafés"
          },
          nav_court: {
              label: "Food Courts"
          },
          nav_bakeries: {
              label: "Bakeries"
          },
          nav_dessert: {
              label: "Dessert Parlor"
          },
          nav_bars: {
              label: "Bars"
          },
          nav_fine: {
              label: "Fine Dining"
          }
      },
      nav_cost_two: {
          nav_three: {
              label: "Less than PHP350"
          },
          nav_seven: {
              label: "PHP350 to PHP700"
          },
          nav_fourteen: {
              label: "PHP700 to PHP1400"
          },
          mav_up: {
              label: "PHP1400 +"
          }
      }
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
</style>