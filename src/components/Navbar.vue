<template>
  <div>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper row valign-wrapper">
      <a href="/" id="zarap" class="hide-on-med-and-down col valign-wrapper" v-bind:class="{s2 : hasSearch, left : hasSearch}">zarap</a>
      <!--Navbar for Smaller Screens-->
      <div class = "hide-on-large-only">
        <a href="#" data-target="filter-choice" class="left sidenav-trigger" v-if="!hasFilter"><i class="material-icons">swap_vert</i></a>
        <a href="/" id="zarap" class="brand-logo center">zarap</a>
        <a href="#" data-target="slide-out" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>

      <!--Searchbar-->
      <div class="search-section col s7 hide-on-med-and-down" v-show="hasSearch">
        <form class="search-bar">
          <div class="input-field">
            <input type="text" class="white search-box" name="searchbar" placeholder="   Search your favorite restaurants here...">
          </div>
        </form>
        <a class="waves-effect waves-light btn #e53935 red darken-1" href="">search</a>
      </div>    
      
      <!--Unlogged Login Section-->
      <ul class="right hide-on-med-and-down col s3" v-if="!isLogged">
        <div class="right">
          <li><a href="../login.html">Login</a></li>
          <li><a href="../register.html">Register</a></li>
        </div>
      </ul>

      <!--Logged Profile Section-->
      <ul class="right hide-on-med-and-down col s3" v-else>
        <div class="right navbar-right valign-wrapper">
          <img class="circle navbar-image" src="../assets/pictures/jonal.jpg">
          <li><a class="dropdown-trigger" href="" data-target="dropdown1"><span class="white-text username">Welcome, Jonal</span><i class="material-icons right">arrow_drop_down</i></a></li>
        </div>
      </ul>
      </div> 
    </nav>
    <!-- Dropdown for Profile Section --> 
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="../userdetail.html#profile" class="black-text">My Profile</a></li>
      <li class="divider"></li>
      <li><a href="../userdetail.html#dining-history" class="black-text">Dining History</a></li>
      <li class="divider"></li>
      <li><a href="../userdetail.html#my-reviews" class="black-text">My Reviews</a></li>
    </ul>
  </div>
  
  <!--Sidebar Content Unlogged-->
  <ul id="slide-out" class="sidenav" v-if="!isLogged">
    <li><div class="divider"></div></li>
    <li><a href="../register.html">Register</a></li>
    <li><div class="divider"></div></li>
    <li><a href="../login.html">Login</a></li>
  </ul>

  <!--Sidebar Logged --> 
  <ul id="slide-out" class="sidenav" v-else>
    <li><div class="user-view">
      <div class="background">
      </div>
      <a href="#user"><img class="circle" src="../assets/pictures/jonal.jpg"></a>
      <a href="#name"><span class="username-sidenav">Jonal</span></a>
    </div></li>
    <li><div class="divider"></div></li>
    <li><a href="/" class="waves-effect">Profile</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/" class="waves-effect">Dining History</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/" class="waves-effect">My Reviews</a></li>
  </ul>

  <!--Filter -->
  <ul id="filter-choice" class="right sidenav" v-if="hasFilter">
    <li><a href="#!" class="dropdown-trigger" data-target="sort-by">Sort by
        <i class="material-icons right">arrow_drop_down</i></a></li>
    <li class="divider"></li>
    <li><a href="#!" class="dropdown-trigger" data-target="category">Category
        <i class="material-icons right">arrow_drop_down</i></a></li>
    <li class="divider"></li>
    <li><a href="#!" class="dropdown-trigger" data-target="location">Location
        <i class="material-icons right">arrow_drop_down</i></a></li>
    <li class="divider"></li>
    <li><a href="#!" class="dropdown-trigger" data-target="cuisine">Cuisine
        <i class="material-icons right">arrow_drop_down</i></a></li>
    <li class="divider"></li>
    <li><a href="#!" class="dropdown-trigger" data-target="establishment-type">Establishment Type
        <i class="material-icons right">arrow_drop_down</i></a></li>
    <li class="divider"></li>
    <li><a href="#!" class="dropdown-trigger" data-target="cost-for-two">Cost for Two
        <i class="material-icons right">arrow_drop_down</i></a></li>
  </ul>
  <!--Dropdown for Rating, Cost and Newly Added-->
  <ul id="sort-by" class="dropdown-content">
    <li><a href="#">Rating - high to low</a></li>
    <li><a href="#">Cost - high to low</a></li>
    <li><a href="#">Cost - low to high</a></li>
    <li><a href="#">Newly Added</a></li>
  </ul>
  <!--Dropdown for Filter Category-->
  <ul id="category" class="dropdown-content">
    <li><a href="#">Dine-out</a></li>
    <li><a href="#">Delivery</a></li>
    <li><a href="#">Drinks &amp; Nightlife</a></li>
    <li><a href="#">Cafés</a></li>
  </ul>
  <!--Dropdown for Filter Location-->
  <ul id="location" class="dropdown-content">
    <li><a href="#">Manila</a></li>
    <li><a href="#">Quezon City</a></li>
    <li><a href="#">Makati City</a></li>
    <li><a href="#">Pasig City</a></li>
    <li><a href="#">Pasay City</a></li>
    <li><a href="#">Parañaque City</a></li>
    <li><a href="#">Taguig City</a></li>
    <li><a href="#">See all locations</a></li>
  </ul>
  <!--Dropdown for Filter Cuisine-->
  <ul id="cuisine" class="dropdown-content">
    <li><a href="#">Filipino</a></li>
    <li><a href="#">Beverages</a></li>
    <li><a href="#">American</a></li>
    <li><a href="#">Fastfood</a></li>
    <li><a href="#">Chinese</a></li>
    <li><a href="#">Coffee</a></li>
    <li><a href="#">Bakery</a></li>
    <li><a href="#">Tea</a></li>
    <li><a href="#">Street Food</a></li>
    <li><a href="#">Japanese</a></li>
    <li><a href="#">See all cuisines</a></li>
  </ul>
  <!--Dropdown for Filter Establishment Type-->
  <ul id="establishment-type" class="dropdown-content">
    <li><a href="#">Quick Bites</a></li>
    <li><a href="#">Casual Dining</a></li>
    <li><a href="#">Beverage Shops</a></li>
    <li><a href="#">Kiosks</a></li>
    <li><a href="#">Cafés</a></li>
    <li><a href="#">Food Courts</a></li>
    <li><a href="#">Bakeries</a></li>
    <li><a href="#">Dessert Parlor</a></li>
    <li><a href="#">Bars</a></li>
    <li><a href="#">Fine Dining</a></li>
  </ul>
  <!--Dropdown for Filter Cost for two-->
  <ul id="cost-for-two" class="dropdown-content">
    <li><a href="#">Less than PHP350</a></li>
    <li><a href="#">PHP350 to PHP700</a></li>
    <li><a href="#">PHP700 to PHP1400</a></li>
    <li><a href="#">PHP1400 +</a></li>
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
    hasSearch: Boolean,
    isLogged: Boolean,
    hasFilter: Boolean,
  },
  mounted() {
    M.AutoInit(); 
  }
}
</script>

<style scoped>
@import '../assets/css/navbar.css'; 
</style>