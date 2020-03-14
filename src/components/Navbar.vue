<template>
  <div>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper row valign-wrapper">
      <a href="/" id="zarap" class="hide-on-med-and-down col valign-wrapper" v-bind:class="{s2 : hasSearch, left : hasSearch}">zarap</a>
      <!--Navbar for Smaller Screens-->
      <div class = "hide-on-large-only">
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
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </div>
      </ul>

      <!--Logged Profile Section-->
      <ul class="right hide-on-med-and-down col s3" v-else>
        <div class="right navbar-right valign-wrapper">
          //TODO Name of Logged
          <img class="circle navbar-image" src="../assets/pictures/jonal.jpg">
          <li><a class="dropdown-trigger" href="" data-target="dropdown1"><span class="white-text username">Welcome, Jonal</span><i class="material-icons right">arrow_drop_down</i></a></li>
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
      //TODO Logout
      <li class="divider"></li>
      <li><a href="/userdetail" class="black-text">Logout</a></li>
    </ul>
  </div>
  
  <!--Sidebar Content Unlogged-->
  <ul id="slide-out" class="sidenav" v-if="!isLogged">
    <li><div class="divider"></div></li>
    <li><a href="/register">Register</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/login">Login</a></li>
  </ul>

  <!--Sidebar Logged --> 
  <ul id="slide-out" class="sidenav" v-else>
    <li><div class="user-view">
      <div class="background">
      </div>
      //TODO Name of Logged
      <a href="#user"><img class="circle" src="../assets/pictures/jonal.jpg"></a>
      <a href="#name"><span class="username-sidenav">Jonal</span></a>
    </div></li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/profile" class="waves-effect">Profile</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/dining" class="waves-effect" >Dining History</a></li>
    <li><div class="divider"></div></li>
    <li><a href="/userdetail/review" class="waves-effect" >My Reviews</a></li>
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
    isLogged: Boolean //If user is logged in 
  },
  mounted() {
    M.AutoInit(); 
  }
}
</script>

<style scoped>
  @import '../assets/css/navbar.css'; 
</style>