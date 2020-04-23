<template>
    <div class="filter-container">
        <!-- Filter Bar in Desktop and Tablet View -->
        <div class="hide-on-med-and-down">
            <div>
                <ul class="collection with-header">
                    <li class="collection-item">
                        <h5> Filters </h5>
                    </li>
                    <li class="collection-item clickable" @click="clearFilters()">
                        <h6 class="red-text"> Clear Filter </h6>
                    </li>
                    <!-- Filtered by Rating, Cost -->
                    <li class="collection-item">
                        <h6> Sort by </h6>
                    </li>
                    <li v-for="n in sortList.length" :key="sortList[n-1].label+n" class="collection-item clickable" :class="{ 'isSelected' : sortToggles[n-1]}" @click="selectSort(n-1)">
                        <a class="left" :class="{ 'textSelected' : sortToggles[n-1]}"> {{sortList[n-1].label}} </a>
                        <div class="grey-text" :class="{ 'textSelected' : sortToggles[n-1]}"> &nbsp; {{sortList[n-1].option}} </div>
                    </li>

                    <!-- Filtered by Location -->
                    <li class="collection-item">
                        <h6> Location </h6>
                    </li>
                    <li v-for="n in 6" :key="cityList[n-1].label" class="collection-item clickable" :class="{ 'isSelected' : cityToggles[n-1]}" @click="selectCity(n-1)">
                        <a :class="{ 'textSelected' : cityToggles[n-1]}"> {{cityList[n-1].label}} City </a>
                    </li>
                    <li class="collection-item clickable">
                        <a class="modal-trigger" href="#filbar_modalloc"> See all locations</a>
                    </li>
                    
                    <div id="filbar_modalloc" class="modal">
                        <div class="modal-content">
                            <h4>Please choose your location</h4>
                            <table>
                                <tbody>
                                    <tr v-for="row in 5" :key="row">
                                        <td v-for="index in 3" :key="index" class="clickable" :class="{ 'isSelected' : cityToggles[index - 1 + (3 * (row - 1))]}" @click="selectCity(index - 1 + (3 * (row - 1)))">
                                            <a :class="{ 'textSelected' : cityToggles[index - 1 + (3 * (row - 1))]}"> {{cityList[index - 1 + (3 * (row - 1))].label}} City </a>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td v-for="index in 2" :key="index" class="clickable" :class="{ 'isSelected' : cityToggles[index - 1 + (3 * 5)]}" @click="selectCity(index - 1 + (3 * 5))">
                                            <a :class="{ 'textSelected' : cityToggles[index - 1 + (3 * 5)]}"> {{cityList[index - 1 + (3 * 5)].label}} City </a>
                                        </td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!--Filtered by Cuisine-->
                    <li class="collection-item">
                        <h6> Cuisine </h6>
                    </li>
                    <li v-for="n in 6" :key="n" class="collection-item clickable" :class="{ 'isSelected' : cuisineToggles[n-1]}" @click="selectCuisine(n-1)">
                        <a :class="{ 'textSelected' : cuisineToggles[n-1]}">{{cuisineList[n-1].label}} </a>
                    </li>
                    <li class="collection-item clickable">
                        <a class="modal-trigger" href="#filbar_modalcuisines"> See all cuisine</a>
                    </li>
                    
                    <div id="filbar_modalcuisines" class="modal">
                        <div class="modal-content">
                            <h4>Please choose your cuisines</h4>
                            <table>
                                <tbody> 
                                    <tr v-for="row in 8" :key="row">
                                        <td v-for="index in 3" :key="index" class="clickable" :class="{ 'isSelected' : cuisineToggles[index - 1 + (3 * (row - 1))]}" @click="selectCuisine(index - 1 + (3 * (row - 1)))">
                                            <a :class="{ 'textSelected' : cuisineToggles[index - 1 + (3 * (row - 1))]}"> {{cuisineList[index - 1 + (3 * (row - 1))].label}}</a>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td v-for="index in 2" class="clickable" :key="index" :class="{ 'isSelected' : cuisineToggles[index - 1 + (3 * 8)]}" @click="selectCuisine(index - 1 + (3 * 8))">
                                            <a :class="{ 'textSelected' : cuisineToggles[index - 1 + (3 * 8)]}"> {{cuisineList[index - 1 + (3 * 8)].label}}</a>
                                        </td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>

                    <!--Filtered by  Establishment Type-->
                    <li class="collection-item">
                        <h6> Establishment Type </h6>
                    </li>
                    <li v-for="n in estList.length" :key="estList[n-1].label"
                        class="collection-item clickable" :class="{ 'isSelected' : estToggles[n-1]}" @click="selectEstType(n-1)">
                        <a :class="{ 'textSelected' : estToggles[n-1]}" > {{estList[n-1].label}} </a>
                    </li>
                    
                    <!--Filtered by Cost for two-->
                    <li class="collection-item">
                        <h6> Cost for two </h6>
                    </li>
                    <li v-for="n in costList.length" :key="costList[n-1].label"
                        class="collection-item clickable" :class="{ 'isSelected' : costToggles[n-1]}" @click="selectCostFilter(n-1)"  >
                        <a :class="{ 'textSelected' : costToggles[n-1]}"> {{costList[n-1].label}} </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
import { mapMutations, mapGetters, mapActions } from 'vuex'; 
export default {
    Name: "Filterbar",
    data() {
        return{
            update : false, 
            sortList: [
                {label:"Rating", option : " - high to low", order: -1},
                {label:"Cost", option : " - high to low", order: -1},
                {label:"Cost", option : " - low to high", order: 1}
            ],
            cityList: [
                {label: "Quezon"},
                {label: "Manila"},
                {label: "Makati"},
                {label: "Pasig"},
                {label: "Taguig"},
                {label: "Mandaluyong"},
                {label: "Parañaque"},
                {label: "Pasay"},
                {label: "Muntinlupa"},
                {label: "Las Piñas"},
                {label: "Marikina"},
                {label: "San Juan"},
                {label: "Caloocan"},
                {label: "Valenzuela"},
                {label: "Malabon"},
                {label: "Navotas"},
                {label: "Pateros"}
            ],
            cuisineList: [
                {label: "American"},
                {label: "Asian"},
                {label: "BBQ"},
                {label: "Bakery"},
                {label: "Bar Food"},
                {label: "Beverages"},
                {label: "Bubble Tea"},
                {label: "Burger"},
                {label: "Chinese"},
                {label: "Coffee"},
                {label: "Desserts"},
                {label: "Fast Food"},
                {label: "Filipino"},
                {label: "Healthy Food"},
                {label: "Hotpot"},
                {label: "International"},
                {label: "Italian"},
                {label: "Japanese"},
                {label: "Korean"},
                {label: "Korean BBQ"},
                {label: "Pizza"},
                {label: "Ramen"},
                {label: "Salad"},
                {label: "Seafood"},
                {label: "Street Food"},
                {label: "Tea"},
            ],
            estList: [
                {label: "Quick Bites",isSelected: false},
                {label: "Casual Dining"},
                {label: "Kiosks"},
                {label: "Cafés"},
                {label: "Food Courts"},
                {label: "Bakeries",isSelected: false},
                {label: "Dessert Parlor"},
                {label: "Bars"},
                {label: "Fine Dining"},
            ],
            costList:[
                {label: "Less than PHP350", low : 0, upper : 349},
                {label: "PHP350 to PHP700", low : 350, upper : 699},
                {label: "PHP700 to PHP1400", low : 700, upper : 1399},
                {label: "PHP1400 +", low : 1400, upper : -1},
            ]
        }
    },
    computed: {
        cityToggles() {
            return (this.update || !this.update) ? this.fetchCityToggles() : this.fetchCityToggles();
        }, 
        cuisineToggles() {
            return (this.update || !this.update) ? this.fetchCuisineToggles() : this.fetchCuisineToggles();
        },
        estToggles() {
            return (this.update || !this.update) ? this.fetchEstToggles() : this.fetchEstToggles(); 
        },
        costToggles() {
            return (this.update || !this.update) ? this.fetchCostToggles() : this.fetchCostToggles(); 
        },
        sortToggles() {
            return (this.update || !this.update) ? this.fetchSortToggles() : this.fetchSortToggles(); 
        }
    },
    methods: {
        ...mapGetters(["fetchFilters", "fetchSortToggles", "fetchCityToggles", "fetchCuisineToggles", "fetchEstToggles", "fetchCostToggles"]), 
        ...mapMutations(["toggleFilterSort","toggleFilterCity","toggleFilterCuisine","toggleFilterCost","toggleFilterEst", "updateFilteredRestaurants","clearFilter"]),
        ...mapActions(["updateFilter"]),
        selectCity(index) {
            let payload = [
                index, 
                this.cityList[index].label
            ]
            this.toggleFilterCity(payload); 
            this.updateFilters(); 
        },
        selectCuisine(index) {
            let payload = [
                index, 
                this.cuisineList[index].label
            ]
            this.toggleFilterCuisine(payload); 
            this.updateFilters();
        },
        selectCostFilter(index) {
            let payload = [
                index,
                this.costList[index].low, 
                this.costList[index].upper
            ]
            this.toggleFilterCost(payload); 
            this.updateFilters();
        },
        selectSort(index) {
            let payload = [
                index,
                this.sortList[index].label, 
                this.sortList[index].order
            ]
            this.toggleFilterSort(payload); 
            this.updateFilters(); 
        },
        selectEstType(index) {
            let payload = [
                index,
                this.estList[index].label
            ]
            this.toggleFilterEst(payload); 
            this.updateFilters();
        },
        async updateFilters() {
            this.updateFilteredRestaurants();
            this.update = !this.update; 
        },
        clearFilters() {
            this.clearFilter(); 
            this.update = !this.update; 
        }
    },
    mounted() {
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {});
        });
    }
}
</script>

<style scoped>
    .filter-container {
        width: 25vw; 
        padding-left: 2rem; 
    }
    .clickable {
        cursor: pointer; 
    }
    .isSelected {
        background-color: #4caf50 !important;   
    }
    .textSelected {
        color: var(--default-background-color) !important; 
    }
    td {
        text-align: center; 
    }
    @media screen and (max-width: 990px) {
        .filter-container {
            width: 0vw;  
        }
    }
</style>