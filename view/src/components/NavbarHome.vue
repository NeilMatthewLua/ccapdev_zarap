<template>
  <div>
    <div class="navbar-fixed">
        <!--Navbar for Smaller Screens-->
        <div class = "hide-on-large-only">
          <a href="#" data-target="slide-out" class="right sidenav-trigger push-padding"><i class="material-icons black-text">menu</i></a>
        </div> 
          
        <!-- Unlogged Login Section -->
        <div v-show="!this.isLoggedIn">
          <ul class ="nav-flex-right hide-on-med-and-down"  id="nav-mobile">
            <li class ="navitem pushdown"><a @click="goLogin()" class ="black-color">Login</a></li>
            <li class ="navitem boxed"><a @click="goRegister()" class ="black-color">Register</a></li>
          </ul>
        </div>

        <!-- Logged Profile Section -->
        <ul class="right hide-on-med-and-down col s3" v-show="this.isLoggedIn">
          <div class="right navbar-right valign-wrapper">
            <img class="circle navbar-image" :src= user_picture>
            <li>
              <a class="dropdown-trigger" href="#" data-target="dropdown1">
                <span class="black-color username"> Welcome, {{user_firstname}} </span>
                <i class="material-icons right"> arrow_drop_down </i>
              </a>
            </li>
          </div>
        </ul>
        
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
            <img class="circle"  :src= user_picture>
          </a>
          <a>
            <span class="username-sidenav"> {{user_firstname}} </span>
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
      <li><a class="waves-effect sidenav-close" @click="logout()">Logout</a></li>
    </ul>
      <alertModal                
        :message= "message" 
        v-show="isModalVisible"
        @close="closeModal"
        class="bring_front"
      />
  </div>
</template>

<script>
import M from 'materialize-css';
import router from '@/router';
import alertModal from '@/components/alertModal';

export default {
  name: "NavbarHome",
  components: {
        alertModal
  },
  data() {
    return{
      user: null,
      isLogged: false,
      user_firstname: ' ',
      user_picture: ' ',
      show: true,
      isModalVisible: false,
      message: "You're logged out!"
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    showModal() { //confirmation of successful registration
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
    },
    checkLogged() {
        if(this.$store.getters.isLoggedIn) {
          this.user = this.$store.getters.getUser;
          this.user_picture = this.$store.getters.getPicture['url'];
          this.user_firstname = this.user.name.split(" ")[0];
          this.isLogged = true;
        }
    },
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.isLogged= false;
      })
      this.showModal();
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
    }
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
    
  .navbar-fixed {
      height: 80px;  
      z-index: 10 !important; 
  }

  .black-color {
      color:  var(--default-card-color) !important;
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
      padding-right: 20px;
  }

  .navbar-image {
      height: 50px; 
      width: 50px; 
  }

  .username {
      display: inline-block; 
      padding-left: 10px;
  }

  .username-sidenav {
      color: var(--default-font-color); 
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

  .nav-flex-right {
      display: flex;
      float: right;
  }

  .dropdown-trigger {
      display: inline-block; 
  }

</style>