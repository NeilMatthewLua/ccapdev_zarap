<template>
    <div>
        <div class="searched-text">
            <div v-if="search">
                <h4 class="hide-on-med-and-down">"{{search}}" in Metro Manila</h4>
                <h5 class="hide-on-large-only">"{{search}}" in Metro Manila</h5>
            </div>
            <div v-else>
                <h4 class="hide-on-med-and-down">Restaurants in Metro Manila</h4>
                <h5 class="hide-on-large-only">Restaurants in Metro Manila</h5>
            </div>
        </div>

        <div class="loading" v-show="!result">
            <h3>No Restaurant Found.</h3>
            <br>
            <a class="hyperlink" @click="goToSearch()">Search for another restaurant</a>
        </div>

        <div class="main-content" v-show="result">
            <FilterBar />
            <div v-if="!loading">
                <RestaurantCard v-on:did_click_operating_info = "displayOperatingHoursModal" v-for="item in this.fetchAllSearchRestos()" :key="item.restaurantID" :resto="item"/>
            </div>
            <div class="loadingRestos" v-if="loading">
                <h1>LOADING...</h1>
            </div>
        </div>
        <!-- Modal for Operating Hours-->
        <OperatingHourModal v-on:did_click_close = "closeOperatingInfoModal" id="operating-hour-modal" :operatingHour = "this.currentRestaurantOperatingHours" />  
    </div>
</template>

<script>
import { mapActions , mapGetters } from 'vuex';
import FilterBar from './FilterBar.vue';
import RestaurantCard from './RestaurantCard.vue';
import OperatingHourModal from './OperatingHourModal.vue';
import M from 'materialize-css';

/** DOM OBJECTS **/

// Load the DOM modal here on mount
let operatingHourModalInstance = null

export default {
    Name: "SearchContent",
    components: {
        FilterBar,
        RestaurantCard,
        OperatingHourModal
    }, 
    mounted () {
        M.AutoInit();
        // open the operating hour modal using its ID
        const elem = document.getElementById('operating-hour-modal');
        // initializes to the DOM
        operatingHourModalInstance = M.Modal.init(elem, {dismissible: false});
    },
    computed: {
        search() {
            return this.fetchSearch();
        },
        result() {
            if(this.fetchAllSearchRestos().length == 0)
                return false;
            else
                return true;
        }
    },
    data () {
        return {
            loading : true,
            currentRestaurantOperatingHours : null,

        }
    },
    async created() {
        await this.getRestos();
        await this.getPics(this.fetchAllRestos());
        await this.getOperatingHours(this.fetchAllRestos());
        this.loading = false;
    },
    methods: {
        ...mapActions(["getRestos", "getPics", "getOperatingHours", "getSearchRestos", "getSearch"]),
        ...mapGetters(["fetchAllRestos", "fetchAllSearchRestos", "fetchSearch"]),
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
        async goToSearch() {
            let key = null;
            await this.getSearchRestos(key);
            await this.getSearch(key);
        },
    }
}
</script>

<style scoped>
    .searched-text {
        padding-left:3%;
        padding-right:3%;
    }

    .main-content {
        display:flex;
        padding-right: 3%;
        justify-content: center;
    }

    .hyperlink {
        text-decoration: underline; 
        font-size: 2rem; 
    }

    .loading {
      display: flex;
      flex-direction: column; 
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    
    .loadingRestos {
        width: 75vw; 
        text-align: center; 
        padding: 20px; 
    }
</style>