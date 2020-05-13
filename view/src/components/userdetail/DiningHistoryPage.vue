<template>
  <div>
    <div id="content" class="containter-restaurant" v-show="!loading">
      <div class="row pad-left">
        <div class="col s12 m11 l9">
            <RestaurantCard v-on:did_click_operating_info = "displayOperatingHoursModal" v-for="item in this.fetchUserRestos()" :key="item.restaurantID" :resto="item"/>
        </div>
        <div class="col s12 m11 l9 square" v-show="this.fetchUserRestos().length == 0">
            <h5 class="center padd-top"> Don't see anything? Look for restaurants now!</h5>
        </div>
      </div>
    </div>
    <loadModal v-show="loading"/> 
    <!-- Modal for Operating Hours-->
    <OperatingHourModal v-on:did_click_close = "closeOperatingInfoModal" id="operating-hour-modal" :operatingHour = "this.currentRestaurantOperatingHours" /> 
  </div>
</template>

<script>
import M from 'materialize-css';
import RestaurantCard from '../search-restaurant/RestaurantCard.vue';
import OperatingHourModal from '../search-restaurant/OperatingHourModal.vue';
import { mapActions , mapGetters } from 'vuex';
import loadModal from '@/components/loadModal'; 

/** DOM OBJECTS **/

// Load the DOM modal here on mount
let operatingHourModalInstance = null

export default {
    name: "DiningHistoryPage",
    data() {
        return {
            currentRestaurantOperatingHours : null,
            loading : true, //When fetching review posts
        }
    },
    components: {
        RestaurantCard,
        loadModal,
        OperatingHourModal
    },
    watch:{
        async $route (){
            this.loading = true; 
            await this.getRestByUser(this.$route.params.id);
            this.loading = false; 
        }
    },
    mounted() {
        M.AutoInit();
        // open the operating hour modal using its ID
        const elem = document.getElementById('operating-hour-modal');
        // initializes to the DOM
        operatingHourModalInstance = M.Modal.init(elem, {dismissible: false});
        this.loading = false; 
    },
    methods: {
        ...mapGetters(["fetchUserRestos", "fetchOperatingHour"]),
        ...mapActions(["getRestByUser", "getOperatingHours"]),
        displayOperatingHoursModal (restaurantID) {
            // fetch the currentRestaurant opened and fetch its operating hours
            this.currentRestaurantOperatingHours =  restaurantID ? this.$store.getters.fetchOperatingHour(restaurantID)[0].operatingHours : null
            // Open modal
            operatingHourModalInstance.open();
        },
        closeOperatingInfoModal () {
            // close the modal
            operatingHourModalInstance.close();
        },
    },
    async created() {
        //Get user's visited restaurants
        await this.getRestByUser(this.$route.params.id);
        await this.getOperatingHours(this.fetchUserRestos());
    }
}
</script>

<style scoped>
    #content {
        min-height: calc(100vh - 80px);
    }

    .margin-around {
        margin-left: 2% !important;
        margin-right: 2% !important;
    }

    .colored-button {
        background-color: var(--default-button-color) !important;
    }

    .pad-left {
        padding-left: 10%;
        margin-bottom: 50px;
    }

    .big-font {
        font-size: 3vw;
    }
    
    .square {
        padding: 10px; 
        border-bottom: 1px solid #eeeeee;
        border-radius: 0px !important;
        height: 115px !important;
        width: 83% !important;
    }

    .menu-font {
        font-size: 35px;
    }

    .padd-top {
        padding-top: 3%;
    }

    .info-font {
        font-size: 18px !important;
    }

    .pad-menu {
        padding-top: 5%;
        padding-left: 5%;
    }

    .profile-container {
        margin-top: 3%;
        margin-left: 2%;
        padding-bottom: 3%;
    }

    .padd-bottom {
        margin-top: 4%;
        margin-bottom: 5%;
    }

    .margin-right {
        margin-right: 10px;
    }

    .grouped-info {
        display: flex;
    }

    .pad-right-text { 
        padding-right: 20px;
    }

    .remove-margin {
        margin: 0;
    }

    .hover-underline:hover {
        text-decoration: underline;
    }

    .relative-position {
        position: relative;
    }

    .corner-bottom-right {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }

    .corner-bottom-right-review {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    
    .padinput {
        padding-left: 10px !important;
        box-sizing: border-box;
        border-radius: 8px !important;
    }

    @media(max-width: 1830px) {
        .menu-font, .info-font {
            font-size: 25px;
        }
    }

    @media(max-width: 1500px) {
        .menu-font, .info-font {
            font-size: 22px;
        }
    }

    @media(max-width: 1350px) {
        .menu-font, .info-font {
            font-size: 18px;
        }
    }

    @media(max-width: 1030px) {
        .menu-font, .info-font {
            font-size: 16px;
        }
    }

    @media(max-width: 900px) {
        .menu-font, .info-font {
            font-size: 18px;
        }
    }
</style>