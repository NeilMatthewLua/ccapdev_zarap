<template>
    <div>
        <div class="searched-text">
            <h4 class="hide-on-med-and-down">Restaurants in Metro Manila</h4>
            <h5 class="hide-on-large-only">Restaurants in Metro Manila</h5>
        </div>
        <div class="main-content">
            <FilterBar />
            <div class="hide-on-small-only">
                <div class="restaurant-list">
                    <RestaurantCard />
                </div>
            </div>
            <div class="hide-on-med-and-up">
                <div class="mobile-restaurant-list">
                    <MRestaurantCard />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
import FilterBar from './FilterBar.vue';
import RestaurantCard from './RestaurantCard.vue';
import MRestaurantCard from './MRestaurantCard.vue';
export default {
    Name: "SearchContent",
    components: {
        FilterBar,
        RestaurantCard,
        MRestaurantCard
    },
    mounted() {
        M.AutoInit(); 
    }
}
</script>

<style scoped>
@import '../assets/css/SearchResult.css';
</style>