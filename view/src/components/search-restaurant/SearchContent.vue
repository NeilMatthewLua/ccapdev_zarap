<template>
    <div class="search-container">
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

        <div class="loading" v-show="!unfilteredResults">
            <h3>No Restaurant Found.</h3>
        </div>

        <div class="main-content" v-show="unfilteredResults">
            <FilterBar />
            <div class="restaurantCards" v-if="!loading && result">
                <RestaurantCard v-on:did_click_operating_info = "displayOperatingHoursModal" v-for="item in this.fetchAllSearchRestos()" :key="item.restaurantID" :resto="item"/>
            </div>
            <div class="spinner-container" v-if="loading">
                <div class="spinner">
                <loadModal/>
                </div>
            </div>
            <div class="noFilterResults" v-if="!result">
                <h3>No Restaurant Found.</h3>
            </div>
        </div>
        <div class="spinner" v-if="loadFromNav">
            <loadModal/>
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
import loadModal from '@/components/loadModal'; 
import M from 'materialize-css';

/** DOM OBJECTS **/

// Load the DOM modal here on mount
let operatingHourModalInstance = null

export default {
    Name: "SearchContent",
    components: {
        FilterBar,
        RestaurantCard,
        OperatingHourModal,
        loadModal
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
            return (this.update || !this.update) ? this.fetchSearch() : this.fetchSearch();
        },
        result() {
            if(this.fetchAllSearchRestos().length == 0 && (this.update || !this.update))
                return false;
            else
                return true;
        }, 
        unfilteredResults() {
            if(this.fetchUnmodifiedRestos().length == 0 && (this.update || !this.update))
                return false;
            else
                return true;
        }, 
        loadFromNav() {
            return this.fetchIsLoading(); 
        }
    },
    data () {
        return {
            loading : true,
            currentRestaurantOperatingHours : null,
            update: false
        }
    },
    async created() {
        await this.getPics(this.fetchAllRestos());
        await this.getOperatingHours(this.fetchAllRestos());
        this.update = !this.update; 
        this.loading = false;
    },
    methods: {
        ...mapActions(["getRestos", "getPics", "getOperatingHours", "getSearchRestos", "getSearch"]),
        ...mapGetters(["fetchIsLoading", "fetchAllRestos", "fetchAllSearchRestos", "fetchSearch", "fetchUnmodifiedRestos", "fetchIsloading"]),
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
            await this.getSearch(key);
            await this.getSearchRestos(key);
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

    .noFilterResults {
        width: 75vw; 
        text-align: center; 
        padding: 20px;
        padding-left: 0px; 
    }

    .loadingRestos {
        width: 75vw; 
        text-align: center; 
        padding: 20px;
        padding-left: 0px; 
    }

    .restaurantCards {
        width: 75vw; 
    }
    
    .spinner-container {
        width: 75vw; 
        height: 30vh;  
        display: flex;
        align-items: center; 
        justify-content: center;
    }

    .spinner {
        vertical-align: middle;
    }

    @media screen and (max-width: 990px) {
        .restaurantCards {
            width: 100vw; 
        }
    }
</style>