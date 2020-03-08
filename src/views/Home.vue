<template>
  <div>
    <div class ="BG-color">
    <!--Navbar-->
      <div>
        <ul class ="nav-flex-right hide-on-med-and-down"  id="nav-mobile">
          <li class ="navitem pushdown"><a href="/login" class ="black-color">Login</a></li>
          <li class ="navitem boxed"><a href="/register"  class ="black-color">Register</a></li>
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
            <a class ="waves-effect waves-light btn pushdown colored-button" href="/SearchResult">search</a>
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
            <div class ="card BG-black-color">
              <div class ="card-content white-text">
                <span class ="card-title">Golden Fortune</span>
                <p>Casual Dining | Seafood | Chinese</p>
              </div>
              <div class ="card-action">
                <a href="Golden Fortune/GoldenFortune-displayRestaurant-logged.html">View Restaurant</a>
              </div>
            </div>
          </div>
          <div class ="col s12 m3 margin_right_5" >
            <div class ="card BG-black-color">
              <div class ="card-content white-text">
                <span class ="card-title">Tim Hortons</span>
                <p>Cafés | Coffee | Desserts</p>
              </div>
              <div class ="card-action">
                <a href="Tim Hortons/TimHortons-displayRestaurant-logged.html">View Restaurant</a>
              </div>
            </div>
          </div>
          <div class ="col s12 m3 margin_right_5" >
            <div class ="card BG-black-color" style="checkHeight">
              <div class ="card-content white-text">
                <span class ="card-title">Big Bowl Noodles</span>
                <p>Quick Bites | Chinese</p>
              </div>
              <div class ="card-action">
                <a href="Big Bowl Noodles/BigBowlNoodles-displayRestaurant-logged.html">View Restaurant</a>
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
import M from 'materialize-css';
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
  },
  mounted() {
    M.AutoInit();
  } 
  // },
  // computed: {
  //  checkHeight: function() {
  //       var highest = 0;
  //       var hi = 0;
  //       console.log(this.height)
  //       $(".card").css('height', '').each(function () {
  //           var h = $(this).height() + $(".card-action").height() + 15; 
  //           if (h > hi) {
  //               hi = h;
  //               highest = h;
  //           }
  //       }); 
  //       $('#output').html(highest);
  //       $(".card").css('height', highest);
  //     return {
  //       'highest': this.height + 'px',
  //     }
  //  }
  // }
}
</script>

<style scoped>
    @import '../assets/css/style.css';
</style>