<template>
  <div>
    <div class ="BG-color">
    <!--Navbar-->
      <div>
        <ul class ="nav-flex-right hide-on-med-and-down"  id="nav-mobile">
          <li class ="navitem pushdown"><a href="/login" class ="black-color">Login</a></li>
          <li class ="navitem boxed"><a href="/register" class ="black-color">Register</a></li>
        </ul>
      </div>

      <!--Navbar for Smaller Screens-->
      <div class = "hide-on-large-only">
        <a href="#" data-target="slide-out" class="right sidenav-trigger push-padding"><i class="material-icons black-text">menu</i></a>
      </div>

      <!--Sidebar Content-->
      <ul id="slide-out" class="sidenav">
        <li><div class="divider"></div></li>
        <li><a href="/register">Register</a></li>
        <li><div class="divider"></div></li>
        <li><a href="/login">Login</a></li>
      </ul>

      <div class ="container pad4">
        <div class ="col s12 m2 valign-wrapper center-align">
          <p class ="z-depth-2 title colored-button">zarap</p>
        </div>
        <div class ="center">
          <p>Find the best restaurants in the metro and so much more</p>
        </div>
        <br>
        <div class ="row">
          <form class ="col s12" id="search_small" method="POST">
            <div class ="input-field col s6 offset-s2 searchround">
              <input type="text" class ="white truncate padinput" name="searchbar" placeholder="Search your favorite restaurants here..." v-model="search">
            </div>
            <a class ="waves-effect waves-light btn pushdown colored-button" href="/searchresult">search</a>
          </form>
        </div>
        <br>
        <br>
      </div>
    </div>

      
    <div class ="lowerhalf">
      <div class ="row">
        <div class ="col s11 offset-s1 card-small">
          <h3>Collections</h3>
          <p class ="truncate card_small">Explore curated lists of top restaurants, cafe, pubs, and bars in Metro Manila, based on trends</p>
        </div>
      </div>

      <div class ="card-row row">
        <div class ="col s11 offset-s1 card_small">
          <div class ="col s12 m3 margin_right_5">
            <div class ="card BG-black-color mobile-height">
              <div class ="card-content white-text">
                <span class ="card-title">Golden Fortune</span>
                <p>Casual Dining | Seafood | Chinese</p>
              </div>
              <div class ="card-action">
                <a href="/restaurant">View Restaurant</a>
              </div>
            </div>
          </div>
          <div class ="col s12 m3 margin_right_5" >
            <div class ="card BG-black-color mobile-height">
              <div class ="card-content white-text">
                <span class ="card-title">Tim Hortons</span>
                <p>Cafés | Coffee | Desserts</p>
              </div>
              <div class ="card-action">
                <a href="/restaurant">View Restaurant</a>
              </div>
            </div>
          </div>
          <div class ="col s12 m3 margin_right_5 mobile-height" >
            <div class ="card BG-black-color mobile-height">
              <div class ="card-content white-text">
                <span class ="card-title">Big Bowl Noodles</span>
                <p>Quick Bites | Chinese</p>
              </div>
              <div class ="card-action">
                <a href="/restaurant">View Restaurant</a>
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

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      search : null
    }
  }
}
</script>

<style scoped>

    .BG-color {
        background-color: var(--default-white-color);
    }

    .lowerhalf {
        background-color: var(--default-background-color);
    }

    .black-color {
        color:  var(--default-card-color) !important;
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

    .square {
        border: 1px solid #2D2D2D;
        border-radius: 3px;
        width: 250px;
        height: 250px;
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