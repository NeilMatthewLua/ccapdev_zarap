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
                    <li class="collection-item" v-for="filbar_location in filbar_locations" v-bind:key="filbar_location.id">
                        <a href="#"> {{filbar_location.label}} </a>
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
                                            <a href="#"> Quezon City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Manila </a>
                                        </td>
                                        <td>
                                            <a href="#"> Makati City </a>
                                        </td>                                    
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Pasig City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Taguig City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Mandaluyong City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Parañaque City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Pasay City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Muntinlupa City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Las Piñas City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Marikina City </a>
                                        </td>
                                        <td>
                                            <a href="#"> San Juan City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Caloocan City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Valenzuela City </a>
                                        </td>
                                        <td>
                                            <a href="#"> Malabon City </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Navotas </a>
                                        </td>
                                        <td>
                                            <a href="#"> Pateros City </a>
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
                        <a href="#"> {{filbar_cuisine.label}} </a>
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
                                            <a href="#"> American </a>
                                        </td>
                                        <td>
                                            <a href="#"> Asian </a>
                                        </td>
                                        <td>
                                            <a href="#"> BBQ </a>
                                        </td>                                    
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Bakery </a>
                                        </td>
                                        <td>
                                            <a href="#"> Bar Food </a>
                                        </td>
                                        <td>
                                            <a href="#"> Beverages </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Bubble Tea </a>
                                        </td>
                                        <td>
                                            <a href="#"> Burger </a>
                                        </td>
                                        <td>
                                            <a href="#"> Chinese </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Coffee </a>
                                        </td>
                                        <td>
                                            <a href="#"> Desserts </a>
                                        </td>
                                        <td>
                                            <a href="#"> Fast Food </a>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Filipino </a>
                                        </td> 
                                        <td>
                                            <a href="#"> Healthy Food </a>
                                        </td>
                                        <td>
                                            <a href="#"> Hotpot </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> International </a>
                                        </td> 
                                        <td>
                                            <a href="#"> Italian </a>
                                        </td>
                                        <td>
                                            <a href="#"> Japanese </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Korean </a>
                                        </td>
                                        <td>
                                            <a href="#"> Korean BBQ </a>
                                        </td>
                                        <td>
                                            <a href="#"> Pizza </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Ramen </a>
                                        </td>
                                        <td>
                                            <a href="#"> Salad </a>
                                        </td>
                                        <td>
                                            <a href="#"> Seafood </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#"> Street Food </a>
                                        </td>
                                        <td>
                                            <a href="#"> Tea </a>
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
                    <li class="collection-item" v-for="filbar_cost in filbar_cost_two" v-bind:key="filbar_cost.id">
                        <a href="#"> {{filbar_cost.label}} </a>
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
            filbar_sort_by: {
                filbar_ratings:{
                    label: "Rating",
                    option: " - high to low"
                },
                filbar_costasc:{
                    label: "Cost",
                    option: " - high to low"
                },
                filbar_costdes:{
                    label: "Cost",
                    option: " - low to high"
                }
            },
            filbar_locations: {
                filbar_manila: {
                    label: "Manila"
                },
                filbar_quezon: {
                    label: "Quezon City"
                },
                filbar_makati: {
                    label: "Makati City"
                },
                filbar_pasig: {
                    label: "Pasig City"
                },
                filbar_pasay: {
                    label: "Pasay City"
                },
                filbar_paranaque: {
                    label: "Parañaque City"
                },
                filbar_taguig: {
                    label: "Taguig City"
                }
                // filbar_others: {
                //     label: "See all locations"
                // }
            },
            filbar_cuisines: {
                filbar_filipino: {
                    label: "Filipino"
                },
                filbar_beverages: {
                    label: "Beverages"
                },
                filbar_american: {
                    label: "American"
                },
                filbar_fastfood: {
                    label: "Fastfood"
                },
                filbar_chinese: {
                    label: "Chinese"
                },
                filbar_coffee: {
                    label: "Coffee"
                },
                filbar_bakery: {
                    label: "Bakery"
                },
                filbar_tea: {
                    label: "Tea"
                },
                filbar_street: {
                    label: "Street Food"
                },
                filbar_japanese: {
                    label: "Japanese"
                }
                // filbar_others: {
                //     label: "See all cuisines"
                // }
            },
            filbar_establishment_types: {
                filbar_quick: {
                    label: "Quick Bites"
                },
                filbar_casual: {
                    label: "Casual Dining"
                },
                filbar_beverage: {
                    label: "Beverage Shops"
                },
                filbar_kiosks: {
                    label: "Kiosks"
                },
                filbar_cafes: {
                    label: "Cafés"
                },
                filbar_court: {
                    label: "Food Courts"
                },
                filbar_bakeries: {
                    label: "Bakeries"
                },
                filbar_dessert: {
                    label: "Dessert Parlor"
                },
                filbar_bars: {
                    label: "Bars"
                },
                filbar_fine: {
                    label: "Fine Dining"
                }
            },
            filbar_cost_two: {
                filbar_three: {
                    label: "Less than PHP350"
                },
                filbar_seven: {
                    label: "PHP350 to PHP700"
                },
                filbar_fourteen: {
                    label: "PHP700 to PHP1400"
                },
                filbar_up: {
                    label: "PHP1400 +"
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
    }
}
</script>