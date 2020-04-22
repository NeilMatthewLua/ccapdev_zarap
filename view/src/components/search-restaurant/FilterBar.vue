<template>
    <div>
        <!-- Filter Bar in Desktop and Tablet View -->
        <div class="hide-on-med-and-down">
            <div>
                <ul class="collection with-header">
                    <li class="collection-item">
                        <h5> Filters </h5>
                        <i class="material-icons" v-if="filter_on" @click="close_filter()">close</i>
                    </li>

                    <!-- Filtered by Rating, Cost -->
                    <li class="collection-item">
                        <h6> Sort by </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_sort in filbar_sort_by" v-bind:key="filbar_sort.id">
                        <a @click="open_filter(filter_sort.category, filter_sort.key)" class="left"> {{filbar_sort.label}} </a>
                        <div class="grey-text"> &nbsp; {{filbar_sort.option}} </div>
                    </li>

                    <!-- Filtered by Location -->
                    <li class="collection-item">
                        <h6> Location </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_location in filbar_locations" v-bind:key="filbar_location.id">
                        <a> {{filbar_location.label}} </a>
                    </li>
                    <li class="collection-item">
                        <a class="modal-trigger" href="#filbar_modalloc"> See all location</a>
                    </li>
                    
                    <div id="filbar_modalloc" class="modal">
                        <div class="modal-content">
                            <h4>Please choose your location</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <a> Quezon City </a>
                                        </td>
                                        <td>
                                            <a> Manila </a>
                                        </td>
                                        <td>
                                            <a> Makati City </a>
                                        </td>                                    
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Pasig City </a>
                                        </td>
                                        <td>
                                            <a> Taguig City </a>
                                        </td>
                                        <td>
                                            <a> Mandaluyong City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Parañaque City </a>
                                        </td>
                                        <td>
                                            <a> Pasay City </a>
                                        </td>
                                        <td>
                                            <a> Muntinlupa City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Las Piñas City </a>
                                        </td>
                                        <td>
                                            <a> Marikina City </a>
                                        </td>
                                        <td>
                                            <a> San Juan City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Caloocan City </a>
                                        </td>
                                        <td>
                                            <a> Valenzuela City </a>
                                        </td>
                                        <td>
                                            <a> Malabon City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Navotas </a>
                                        </td>
                                        <td>
                                            <a> Pateros City </a>
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
                    <li class="collection-item" v-for="filbar_cuisine in filbar_cuisines" v-bind:key="filbar_cuisine.id">
                        <a> {{filbar_cuisine.label}} </a>
                    </li>
                    <li class="collection-item">
                        <a class="modal-trigger" href="#filbar_modalcuisines"> See all cuisine</a>
                    </li>
                    
                    <div id="filbar_modalcuisines" class="modal">
                        <div class="modal-content">
                            <h4>Please choose your cuisines</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <a> American </a>
                                        </td>
                                        <td>
                                            <a> Asian </a>
                                        </td>
                                        <td>
                                            <a> BBQ </a>
                                        </td>                                    
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Bakery </a>
                                        </td>
                                        <td>
                                            <a> Bar Food </a>
                                        </td>
                                        <td>
                                            <a> Beverages </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Bubble Tea </a>
                                        </td>
                                        <td>
                                            <a> Burger </a>
                                        </td>
                                        <td>
                                            <a> Chinese </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Coffee </a>
                                        </td>
                                        <td>
                                            <a> Desserts </a>
                                        </td>
                                        <td>
                                            <a> Fast Food </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Filipino </a>
                                        </td> 
                                        <td>
                                            <a> Healthy Food </a>
                                        </td>
                                        <td>
                                            <a> Hotpot </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> International </a>
                                        </td> 
                                        <td>
                                            <a> Italian </a>
                                        </td>
                                        <td>
                                            <a> Japanese </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Korean </a>
                                        </td>
                                        <td>
                                            <a> Korean BBQ </a>
                                        </td>
                                        <td>
                                            <a> Pizza </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Ramen </a>
                                        </td>
                                        <td>
                                            <a> Salad </a>
                                        </td>
                                        <td>
                                            <a> Seafood </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a> Street Food </a>
                                        </td>
                                        <td>
                                            <a> Tea </a>
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
                        <a> {{filbar_establishment.label}} </a>
                    </li>
                    
                    <!--Filtered by Cost for two-->
                    <li class="collection-item">
                        <h6> Cost for two </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_cost in filbar_cost_two" v-bind:key="filbar_cost.id">
                        <a> {{filbar_cost.label}} </a>
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
            filter_on: false,
            filbar_sort_by: {
                filbar_ratings:{
                    label: "Rating",
                    option: " - high to low",
                    category: "Sort by",
                    key: "rating"
                },
                filbar_costasc:{
                    label: "Cost",
                    option: " - high to low",
                    category: "Sort by",
                    key: "costhigh"
                },
                filbar_costdes:{
                    label: "Cost",
                    option: " - low to high",
                    category: "Sort by",
                    key: "costlow"
                }
            },
            filbar_locations: {
                filbar_manila: {
                    label: "Manila",
                    category: "Location",
                    key: "Manila"
                },
                filbar_quezon: {
                    label: "Quezon City",
                    category: "Location",
                    key: "Quezon"
                },
                filbar_makati: {
                    label: "Makati City",
                    category: "Location",
                    key: "Makati"
                },
                filbar_pasig: {
                    label: "Pasig City",
                    category: "Location",
                    key: "Pasig"
                },
                filbar_pasay: {
                    label: "Pasay City",
                    category: "Location",
                    key: "Pasay"
                },
                filbar_paranaque: {
                    label: "Parañaque City",
                    category: "Location",
                    key: "Parañaque"
                },
                filbar_taguig: {
                    label: "Taguig City",
                    category: "Location",
                    key: "Taguig"
                }
            },
            filbar_cuisines: {
                filbar_filipino: {
                    label: "Filipino",
                    category: "Cuisine",
                    key: "Filipino"
                },
                filbar_beverages: {
                    label: "Beverages",
                    category: "Cuisine",
                    key: "Beverages"
                },
                filbar_american: {
                    label: "American",
                    category: "Cuisine",
                    key: "American"
                },
                filbar_fastfood: {
                    label: "Fastfood",
                    category: "Cuisine",
                    key: "Fastfood"
                },
                filbar_chinese: {
                    label: "Chinese",
                    category: "Cuisine",
                    key: "Chinese"
                },
                filbar_coffee: {
                    label: "Coffee",
                    category: "Cuisine",
                    key: "Coffee"
                },
                filbar_bakery: {
                    label: "Bakery",
                    category: "Cuisine",
                    key: "Bakery"
                },
                filbar_tea: {
                    label: "Tea",
                    category: "Cuisine",
                    key: "Tea"
                },
                filbar_street: {
                    label: "Street Food",
                    category: "Cuisine",
                    key: "Street Food"
                },
                filbar_japanese: {
                    label: "Japanese",
                    category: "Cuisine",
                    key: "Japanese"
                }
            },
            filbar_establishment_types: {
                filbar_quick: {
                    label: "Quick Bites",
                    category: "Establishment Type",
                    key: "Quick Bites"
                },
                filbar_casual: {
                    label: "Casual Dining",
                    category: "Establishment Type",
                    key: "Casual Dining"
                },
                filbar_beverage: {
                    label: "Beverage Shops",
                    category: "Establishment Type",
                    key: "Beverage Shops"
                },
                filbar_kiosks: {
                    label: "Kiosks",
                    category: "Establishment Type",
                    key: "Kiosks"
                },
                filbar_cafes: {
                    label: "Cafés",
                    category: "Establishment Type",
                    key: "Cafés"
                },
                filbar_court: {
                    label: "Food Courts",
                    category: "Establishment Type",
                    key: "Food Courts"
                },
                filbar_bakeries: {
                    label: "Bakeries",
                    category: "Establishment Type",
                    key: "Bakeries"
                },
                filbar_dessert: {
                    label: "Dessert Parlor",
                    category: "Establishment Type",
                    key: "Dessert Parlor"
                },
                filbar_bars: {
                    label: "Bars",
                    category: "Establishment Type",
                    key: "Bars"
                },
                filbar_fine: {
                    label: "Fine Dining",
                    category: "Establishment Type",
                    key: "Fine Dining"
                }
            },
            filbar_cost_two: {
                filbar_three: {
                    label: "Less than PHP350",
                    category: "Cost",
                    key: "350"
                },
                filbar_seven: {
                    label: "PHP350 to PHP700",
                    category: "Cost",
                    key: "700"
                },
                filbar_fourteen: {
                    label: "PHP700 to PHP1400",
                    category: "Cost",
                    key: "1400"
                },
                filbar_up: {
                    label: "PHP1400 +",
                    category: "Cost",
                    key: "1401"
                }
            }
        }
    },
    mounted() {
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {});
        });
    },
    methods: {
        open_filter(category, key) {
            this.filter_on = true;
            this.$emit("is_filtered", {'category' : category, 'key' : key});
        },
        close_filter() {
            this.filter_on = false;
            this.$emit('not_filtered');
        }
    },
    
}
</script>

<style scoped>
    i {
        cursor: pointer;
    }
</style>