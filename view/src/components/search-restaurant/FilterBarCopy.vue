<template>
    <div>
        <!-- Filter Bar in Desktop and Tablet View -->
        <div class="hide-on-med-and-down">
            <div>
                <ul class="collection with-header">
                    <li class="collection-item">
                        <h5> Filters </h5>
                    </li>

                    <!-- Filtered by Rating, Cost -->
                    <li class="collection-item">
                        <h6> Sort by </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_sort in filbar_sort_by" v-bind:key="filbar_sort.id">
                        <a href="#" class="left"> {{filbar_sort.label}} </a>
                        <div class="grey-text"> &nbsp; {{filbar_sort.option}} </div>
                    </li>

                    <!-- Filtered by Location -->
                    <li class="collection-item">
                        <h6> Location </h6>
                    </li>
                    <li class="collection-item" v-for="n in 6" :key="n">
                        <a @click="selectCity(n)"> {{cityList[n].city}} City </a>
                    </li>
                    <li class="collection-item">
                        <a class="modal-trigger" href="#filbar_modalloc"> See all locations</a>
                    </li>
                    
                    <div id="filbar_modalloc" class="modal">
                        <div class="modal-content">
                            <h4>Please choose your location</h4>
                            <table>
                                <tbody>
                                    <tr v-for="row in 5" :key="row">
                                        <td v-for="index in 3" :key="index">
                                            <a @click="selectCity(index - 1 + (3 * (row - 1)))" :col="index - 1 + (3 * (row - 1))"> {{cityList[index - 1 + (3 * (row - 1))].city}} City </a>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td v-for="index in 2" :key="index">
                                            <a @click="selectCity(index - 1 + (3 * (row - 1)))" :col="index - 1 + (3 * 5)"> {{cityList[index - 1 + (3 * 5)].city}} City </a>
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
                    <li class="collection-item" v-for="n in 6" :key="n">
                        <a @click="selectCuisine(n)">{{cuisineList[n].cuisine}} </a>
                    </li>
                    <li class="collection-item">
                        <a class="modal-trigger" href="#filbar_modalcuisines"> See all cuisine</a>
                    </li>
                    
                    <div id="filbar_modalcuisines" class="modal">
                        <div class="modal-content">
                            <h4>Please choose your cuisines</h4>
                            <table>
                                <tbody> 
                                    <tr v-for="row in 8" :key="row">
                                        <td v-for="index in 3" :key="index">
                                            <a @click="selectCuisine(index - 1 + (3 * (row - 1)))" :col="index - 1 + (3 * (row - 1))"> {{cuisineList[index - 1 + (3 * (row - 1))].cuisine}}</a>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td v-for="index in 2" :key="index">
                                            <a @click="selectCuisine(index - 1 + (3 * (row - 1)))" :col="index - 1 + (3 * 8)"> {{cuisineList[index - 1 + (3 * 8)].cuisine}}</a>
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
                    <li class="collection-item" v-for="filbar_establishment in filbar_establishment_types" v-bind:key="filbar_establishment.id">
                        <a href="#"> {{filbar_establishment.label}} </a>
                    </li>
                    
                    <!--Filtered by Cost for two-->
                    <li class="collection-item">
                        <h6> Cost for two </h6>
                    </li>
                    <li class="collection-item" v-for="n in costList.length" :key="n">
                        <a @click="selectCostFilter()"> {{costList[n].label}} </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    Name: "Filterbar",
    data() {
        return{
            cityList: [
                {label: "Quezon", isSelected: false},
                {label: "Manila", isSelected: false},
                {label: "Makati", isSelected: false},
                {label: "Pasig", isSelected: false},
                {label: "Taguig", isSelected: false},
                {label: "Mandaluyong", isSelected: false},
                {label: "Parañaque", isSelected: false},
                {label: "Pasay", isSelected: false},
                {label: "Muntinlupa", isSelected: false},
                {label: "Las Piñas", isSelected: false},
                {label: "Marikina", isSelected: false},
                {label: "San Juan", isSelected: false},
                {label: "Caloocan", isSelected: false},
                {label: "Valenzuela", isSelected: false},
                {label: "Malabon", isSelected: false},
                {label: "Navotas", isSelected: false},
                {label: "Pateros", isSelected: false}
            ],
            sortList: [
                {label:"Rating", option : " - high to low", order: -1, isSelected: false},
                {label:"Cost", option : " - high to low", order: -1, isSelected: false},
                {label:"Cost", option : " - low to high", order: 1, isSelected: false}
            ],
            cuisineList: [
                {label: "American", isSelected: false},
                {label: "Asian", isSelected: false},
                {label: "BBQ", isSelected: false},
                {label: "Bakery", isSelected: false},
                {label: "Bar Food", isSelected: false},
                {label: "Beverages", isSelected: false},
                {label: "Bubble Tea", isSelected: false},
                {label: "Burger", isSelected: false},
                {label: "Chinese", isSelected: false},
                {label: "Coffee", isSelected: false},
                {label: "Desserts", isSelected: false},
                {label: "Fast Food", isSelected: false},
                {label: "Filipino", isSelected: false},
                {label: "Healthy Food", isSelected: false},
                {label: "Hotpot", isSelected: false},
                {label: "International", isSelected: false},
                {label: "Italian", isSelected: false},
                {label: "Japanese", isSelected: false},
                {label: "Korean", isSelected: false},
                {label: "Korean BBQ", isSelected: false},
                {label: "Pizza", isSelected: false},
                {label: "Ramen", isSelected: false},
                {label: "Salad", isSelected: false},
                {label: "Seafood", isSelected: false},
                {label: "Street Food", isSelected: false},
                {label: "Tea", isSelected: false},
            ],
            filbar_establishment_types: [
                {label: "Quick Bites", isSelected},
                {label: "Casual Dining", isSelected},
                {label: "Kiosks", isSelected},
                {label: "Cafés", isSelected},
                {label: "Food Courts", isSelected},
                {label: "Bakeries", isSelected},
                {label: "Dessert Parlor", isSelected},
                {label: "Bars", isSelected},
                {label: "Fine Dining", isSelected},
                {label: "Quick Bites", isSelected},
            ],
            costList:[
                {label: "Less than PHP350", low : 0, upper : 350},
                {label: "PHP350 to PHP700", low : 350, upper : 700},
                {label: "PHP700 to PHP1400", low : 700, upper : 1400},
                {label: "PHP1400 +", low : 1400, upper : 9999},
            ]
        }
    },
    methods: {
        selectCity(index) {
            console.log(index); 
        },
        selectCuisine(index) {
            console.log(index); 
        },
        selectCostFilter(index) {
            console.log(index); 
        },
        selectSort(index) {
            console.log(index); 
        },
        selectEstType(index) {
            console.log(index); 
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