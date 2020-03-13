<template>
    <div>
        <!--Restaurant: Golden Fortune-->
        <div class="card horizontal" id="GoldenFortuneCardLarge">
            <div class="card-image">
                <img src="../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune" class="restaurant-image">
            </div>
            <div class="restaurant-info">
                <div class="card-stacked">
                    <div class="card-content">
                        <p class="restaurant-establisment-type">Casual Dining</p>
                        <br>
                        <a href="#" class="restaurant-name">Golden Fortune</a>
                        <br>
                        <p class="restaurant-location">Ermita</p>
                        <p class="restaurant-address">678 T.M. Kalaw Avenue, Ermita, Manila</p>
                        <br>
                        <p class="restaurant-other-info">Cuisine:&nbsp;Seafood, Chinese</p>
                        <p class="restaurant-other-info">Cost for two:&nbsp;PHP800</p>
                        <p class="restaurant-other-info">Hours:&nbsp;11am – 2:30pm, 5:30pm – 12 midnight (Mon-Sun)</p>
                        <p class="restaurant-other-info">Tel no:&nbsp;02 85222288; 02 85222200</p>
                    </div>
                </div>
                <div class="card-content">
                    <button class="btn hoverable green">3.9/5</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    Name: "RestaurantName",
    mounted() {
        M.AutoInit(); 
    }
}
</script>

<style scoped>
@import '../assets/css/SearchResult.css';
</style>