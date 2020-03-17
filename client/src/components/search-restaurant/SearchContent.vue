<template>
    <div>
        <div class="searched-text">
            <h4 class="hide-on-med-and-down">Restaurants in Metro Manila</h4>
            <h5 class="hide-on-large-only">Restaurants in Metro Manila</h5>
        </div>
        <div class="main-content">
            <FilterBar/>
            <RestaurantCard/>
        </div>
    </div>
</template>

<script>
import FilterBar from './FilterBar.vue';
import RestaurantCard from './RestaurantCard.vue';
export default {
    Name: "SearchContent",
    components: {
        FilterBar,
        RestaurantCard
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
        padding-left: 3%;
        padding-right: 3%;
    }

    .restaurant-list {
        padding-left: 2%;
        padding-right: 2%;
        width: 95%;
    }
</style>