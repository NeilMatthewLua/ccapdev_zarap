<template>
  <div>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper row valign-wrapper">
      <a href="/" id="zarap" class="hide-on-med-and-down col valign-wrapper" v-bind:class="{s2 : hasSearch, left : hasSearch}">zarap</a>
      <!-- Navbar for Smaller Screens -->
      <div class = "hide-on-large-only">
        <a href="#" data-target="filter-choice" class="left sidenav-trigger" v-if="!hasFilter"><i class="material-icons">swap_vert</i></a>
        <a href="/" id="zarap" class="brand-logo center">zarap</a>
        <a href="#" data-target="slide-out" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>

      <!-- Searchbar -->
      <div class="search-section col s7 hide-on-med-and-down" v-show="hasSearch">
        <form class="search-bar">
          <div class="input-field">
            <input type="text" class="white search-box" name="searchbar" placeholder="   Search your favorite restaurants here...">
          </div>
        </form>
        <a class="waves-effect waves-light btn #e53935 red darken-1" href="">search</a>
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
          <img class="circle navbar-image" src="../assets/pictures/jonal.jpg">
          <li>
            <a class="dropdown-trigger" href="" data-target="dropdown1">
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
      <li>
        <a href="../userdetail.html#profile" class="black-text"> My Profile </a>
      </li>
      <li class="divider"></li>
      <li>
        <a href="../userdetail.html#dining-history" class="black-text"> Dining History </a>
      </li>
      <li class="divider"></li>
      <li>
        <a href="../userdetail.html#my-reviews" class="black-text"> My Reviews </a>
      </li>
      <li class="divider"></li>
      <li>
        <a href="../userdetail.html#my-reviews" class="black-text"> Logout </a>
      </li>
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
        <a href="#user">
          <img class="circle" src="../assets/pictures/jonal.jpg">
        </a>
        <a href="#name">
          <span class="username-sidenav"> Jonal </span>
        </a>
      </div>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <a href="/" class="waves-effect"> Profile </a>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <a href="/" class="waves-effect"> Dining History </a>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <a href="/" class="waves-effect"> My Reviews </a>
    </li>
  </ul>

  <!-- Filter -->
  <ul id="filter-choice" class="right sidenav" v-if="hasFilter">
    <li>
      <a href="#!" class="dropdown-trigger" data-target="sort-by"> Sort by
        <i class="material-icons right"> arrow_drop_down </i>
      </a>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#!" class="dropdown-trigger" data-target="category"> Category
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

  <!-- Dropdown for Rating, Cost and Newly Added -->
  <ul id="sort-by" class="dropdown-content" v-for="sort in nav_sort_by" v-bind:key="sort">
    <li>
      <a href="#"> {{sort.label}} - {{sort.option}} </a>
    </li>
  </ul>

  <!-- Dropdown for Filter Category -->
  <ul id="category" class="dropdown-content" v-for="category in nav_categories" v-bind:key="category">
    <li>
      <a href="#"> {{category.label}} </a>
    </li>
  </ul>

  <!--Dropdown for Filter Location-->
  <ul id="location" class="dropdown-content" v-for="location in nav_locations" v-bind:key="location">
    <li>
      <a href="#"> {{location.label}} </a>
    </li>
  </ul>

  <!-- Dropdown for Filter Cuisine -->
  <ul id="cuisine" class="dropdown-content" v-for="cuisine in nav_cuisines" v-bind:key="cuisine">
    <li>
      <a href="#"> {{cuisine.label}} </a>
    </li>
  </ul>

  <!-- Dropdown for Filter Establishment Type -->
  <ul id="establishment-type" class="dropdown-content" v-for="establishment in nav_establishment_types" v-bind:key="establishment">
    <li>
      <a href="#"> {{establishment.label}} </a>
    </li>
  </ul>

  <!-- Dropdown for Filter Cost for two -->
  <ul id="cost-for-two" class="dropdown-content" v-for="cost in nav_cost_two" v-bind:key="cost">
    <li>
      <a href="#"> {{cost.label}} </a>
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
          <a class="waves-effect waves-light btn #e53935 red darken-1" href="../SearchResult.html">search</a>
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
  data() {
    return{
      nav_sort_by: {
        ratings:{
            label: "Rating",
            option: " - high to low"
        },
        costasc:{
            label: "Cost",
            option: " - high to low"
        },
        costdes:{
            label: "Cost",
            option: " - low to high"
        },
        newly_added: {
            label: "Newly Added",
            option: " - high to low"
        }
      },
      nav_categories: {
          dine_out: {
              label: "Dine-out"
          },
          delivery: {
              label: "Delivery"
          },
          drink: {
              label: "Drink & Nightlife"
          },
          cafe: {
              label: "Cafés"
          }
      },
      nav_locations: {
          manila: {
              label: "Manila"
          },
          quezon: {
              label: "Quezon City"
          },
          makati: {
              label: "Makati City"
          },
          pasig: {
              label: "Pasig City"
          },
          pasay: {
              label: "Pasay City"
          },
          paranaque: {
              label: "Parañaque City"
          },
          taguig: {
              label: "Taguig City"
          },
          others: {
              label: "See all locations"
          }
      },
      nav_cuisines: {
          filipino: {
              label: "Filipino"
          },
          beverages: {
              label: "Beverages"
          },
          american: {
              label: "American"
          },
          fastfood: {
              label: "Fastfood"
          },
          chinese: {
              label: "Chinese"
          },
          coffee: {
              label: "Coffee"
          },
          bakery: {
              label: "Bakery"
          },
          tea: {
              label: "Tea"
          },
          street: {
              label: "Street Food"
          },
          japanese: {
              label: "Japanese"
          },
          others: {
              label: "See all cuisines"
          }
      },
      nav_establishment_types: {
          quick: {
              label: "Quick Bites"
          },
          casual: {
              label: "Casual Dining"
          },
          beverage: {
              label: "Beverage Shops"
          },
          kiosks: {
              label: "Kiosks"
          },
          cafes: {
              label: "Cafés"
          },
          court: {
              label: "Food Courts"
          },
          bakeries: {
              label: "Bakeries"
          },
          dessert: {
              label: "Dessert Parlor"
          },
          bars: {
              label: "Bars"
          },
          fine: {
              label: "Fine Dining"
          }
      },
      nav_cost_two: {
          three: {
              label: "Less than PHP350"
          },
          seven: {
              label: "PHP350 to PHP700"
          },
          fourteen: {
              label: "PHP700 to PHP1400"
          },
          up: {
              label: "PHP1400 +"
          }
      }
    }
  },
  mounted() {
    M.AutoInit(); 
  }
}
</script>

<style scoped>
  @import '../assets/css/navbar.css'; 
</style>