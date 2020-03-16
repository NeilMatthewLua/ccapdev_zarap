<template>
    <div>
        <!-- Filter Bar in Desktop and Tablet View -->
        <div class="hide-on-med-and-down">
            <div>
                <ul class="collection with-header">
                    <li class="collection-item">
                        <h5> Filters </h5>
                    </li>

                    <!-- Filtered by Rating, Cost and Newly Added -->
                    <li class="collection-item">
                        <h6> Sort by </h6>
                    </li>
                    <li class="collection-item" v-for="sort in sort_by" v-bind:key="sort">
                        <a href="#" class="left"> {{sort.label}} </a>
                        <div class="grey-text"> &nbsp; {{sort.option}} </div>
                    </li>

                    <!-- Filtered by Category -->
                    <li class="collection-item">
                        <h6> Category </h6>
                    </li>
                    <li class="collection-item" v-for="category in categories" v-bind:key="category">
                        <a href="#"> {{category.label}} </a>
                    </li>

                    <!-- Filtered by Location -->
                    <li class="collection-item">
                        <h6> Location </h6>
                    </li>
                    <li class="collection-item" v-for="location in locations" v-bind:key="location">
                        <a href="#"> {{location.label}} </a>
                    </li>

                    <!--Filtered by Cuisine-->
                    <li class="collection-item">
                        <h6> Cuisine </h6>
                    </li>
                    <li class="collection-item" v-for="cuisine in cuisines" v-bind:key="cuisine">
                        <a href="#"> {{cuisine.label}} </a>
                    </li>

                    <!--Filtered by  Establishment Type-->
                    <li class="collection-item">
                        <h6> Establishment Type </h6>
                    </li>
                    <li class="collection-item" v-for="establishment in establishment_types" v-bind:key="establishment">
                        <a href="#"> {{establishment.label}} </a>
                    </li>
                    
                    <!--Filtered by Cost for two-->
                    <li class="collection-item">
                        <h6> Cost for two </h6>
                    </li>
                    <li class="collection-item" v-for="cost in cost_two" v-bind:key="cost">
                        <a href="#"> {{cost.label}} </a>
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
            sort_by: {
                ratings:{
                    label: "Rating",
                    option: " - high to low"
                },
                costasc:{
                    label: "Cost",
                    option: " - high to low"
                },
                costdes:{
                    label: "Cost",
                    option: " - low to high"
                },
                newly_added: {
                    label: "Newly Added",
                    option: " - high to low"
                }
            },
            categories: {
                dine_out: {
                    label: "Dine-out"
                },
                delivery: {
                    label: "Delivery"
                },
                drink: {
                    label: "Drink & Nightlife"
                },
                cafe: {
                    label: "Cafés"
                }
            },
            locations: {
                manila: {
                    label: "Manila"
                },
                quezon: {
                    label: "Quezon City"
                },
                makati: {
                    label: "Makati City"
                },
                pasig: {
                    label: "Pasig City"
                },
                pasay: {
                    label: "Pasay City"
                },
                paranaque: {
                    label: "Parañaque City"
                },
                taguig: {
                    label: "Taguig City"
                },
                others: {
                    label: "See all locations"
                }
            },
            cuisines: {
                filipino: {
                    label: "Filipino"
                },
                beverages: {
                    label: "Beverages"
                },
                american: {
                    label: "American"
                },
                fastfood: {
                    label: "Fastfood"
                },
                chinese: {
                    label: "Chinese"
                },
                coffee: {
                    label: "Coffee"
                },
                bakery: {
                    label: "Bakery"
                },
                tea: {
                    label: "Tea"
                },
                street: {
                    label: "Street Food"
                },
                japanese: {
                    label: "Japanese"
                },
                others: {
                    label: "See all cuisines"
                }
            },
            establishment_types: {
                quick: {
                    label: "Quick Bites"
                },
                casual: {
                    label: "Casual Dining"
                },
                beverage: {
                    label: "Beverage Shops"
                },
                kiosks: {
                    label: "Kiosks"
                },
                cafes: {
                    label: "Cafés"
                },
                court: {
                    label: "Food Courts"
                },
                bakeries: {
                    label: "Bakeries"
                },
                dessert: {
                    label: "Dessert Parlor"
                },
                bars: {
                    label: "Bars"
                },
                fine: {
                    label: "Fine Dining"
                }
            },
            cost_two: {
                three: {
                    label: "Less than PHP350"
                },
                seven: {
                    label: "PHP350 to PHP700"
                },
                fourteen: {
                    label: "PHP700 to PHP1400"
                },
                up: {
                    label: "PHP1400 +"
                }
            }
        }
    }
}
</script>