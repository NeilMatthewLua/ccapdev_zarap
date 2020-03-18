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

                    <!-- Filtered by Category -->
                    <li class="collection-item">
                        <h6> Category </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_category in filbar_categories" v-bind:key="filbar_category.id">
                        <a href="#"> {{filbar_category.label}} </a>
                    </li>

                    <!-- Filtered by Location -->
                    <li class="collection-item">
                        <h6> Location </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_location in filbar_locations" v-bind:key="filbar_location.id">
                        <a href="#"> {{filbar_location.label}} </a>
                    </li>

                    <!--Filtered by Cuisine-->
                    <li class="collection-item">
                        <h6> Cuisine </h6>
                    </li>
                    <li class="collection-item" v-for="filbar_cuisine in filbar_cuisines" v-bind:key="filbar_cuisine.id">
                        <a href="#"> {{filbar_cuisine.label}} </a>
                    </li>

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
            filbar_categories: {
                filbar_dine_out: {
                    label: "Dine-out"
                },
                filbar_delivery: {
                    label: "Delivery"
                },
                filbar_drink: {
                    label: "Drink & Nightlife"
                },
                filbar_cafe: {
                    label: "Cafés"
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
                },
                filbar_others: {
                    label: "See all locations"
                }
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
                },
                filbar_others: {
                    label: "See all cuisines"
                }
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
    }
}
</script>