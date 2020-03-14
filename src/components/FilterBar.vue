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
                    <li class="collection-item">
                        <a href="#" class="left"> Rating </a>
                        <div class="grey-text"> &nbsp; - high to low </div>
                    </li>
                    <li class="collection-item">
                        <a href="#" class="left"> Cost </a>
                        <div class="grey-text"> &nbsp; - high to low </div>
                    </li>
                    <li class="collection-item">
                        <a href="#" class="left"> Cost </a>
                        <div class="grey-text"> &nbsp; - low to high </div
                    ></li>
                    <li class="collection-item">
                        <a href="#" class="left"> Newly Added </a>
                        <div class="grey-text"> &nbsp; - high to low </div>
                    </li>

                    <!-- Filtered by Category -->
                    <li class="collection-item">
                        <h6> Category </h6>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Dine-out </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Delivery </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Drink &amp; Nightlife </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Cafés </a>
                    </li>

                    <!-- Filtered by Location -->
                    <li class="collection-item">
                        <h6> Location </h6>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Manila </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Quezon City </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Makati City </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Pasig City </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Pasay City </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Parañaque City </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Taguig City </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> See all locations </a>
                    </li>

                    <!--Filtered by Cuisine-->
                    <li class="collection-item">
                        <h6> Cuisine </h6>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Filipino </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Beverages </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> American </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Fastfood </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Chinese </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Coffee </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Bakery </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Tea </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Street Food </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Japanese </a>
                        </li>
                    <li class="collection-item">
                        <a href="#"> See all cuisines </a>
                    </li>

                    <!--Filtered by  Establishment Type-->
                    <li class="collection-item">
                        <h6> Establishment Type </h6>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Quick Bites </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Casual Dining </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Beverage Shops </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Kiosks </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Cafés </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Food Courts </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Bakeries </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Dessert Parlor </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Bars </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Fine Dining </a>
                    </li>
                    
                    <!--Filtered by Cost for two-->
                    <li class="collection-item">
                        <h6> Cost for two </h6>
                    </li>
                    <li class="collection-item">
                        <a href="#"> Less than PHP350 </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> PHP350 to PHP700 </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> PHP700 to PHP1400 </a>
                    </li>
                    <li class="collection-item">
                        <a href="#"> PHP1400 + </a>
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
    mounted() {
        M.AutoInit(); 
    }
}
</script>

<style scoped>
@import '../assets/css/SearchResult.css';
</style>