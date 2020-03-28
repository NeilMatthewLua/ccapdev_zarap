<template>
    <div>
        <div class="searched-text">
            <h4 class="hide-on-med-and-down">Restaurants in Metro Manila</h4>
            <h5 class="hide-on-large-only">Restaurants in Metro Manila</h5>
        </div>
        <div class="main-content">
            <FilterBar/>
            <div v-if="!loading">
                <RestaurantCard v-for="item in this.fetchAllRestos()" :key="item.restaurantID" :resto="item"/>
            </div>
            <div v-if="loading">
                <h1>LOADING...</h1>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions , mapGetters } from 'vuex';
import FilterBar from './FilterBar.vue';
import RestaurantCard from './RestaurantCard.vue';
export default {
    Name: "SearchContent",
    components: {
        FilterBar,
        RestaurantCard
    }, 
    data () {
        return {
            loading : true,
        }
    },
    async created() {
        await this.getRestos();
        await this.getPics(this.fetchAllRestos());
        await this.getOperatingHours(this.fetchAllRestos());
        this.loading = false;
    },
    methods: {
        ...mapActions(["getRestos", "getRestoByQuery", "getPics", "getRestoById", "getOperatingHours"]),
        ...mapGetters(["fetchAllRestos", "fetchAllPic", "fetchCurrResto", "fetchAllOperatingHours"]),
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
</style>