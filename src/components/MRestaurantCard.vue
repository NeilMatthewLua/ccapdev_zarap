<template>
    <div>
        <div class="card" id="GoldenFortuneCardSmall">
            <div class="card-image">
                <img src="../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune" class="mobile-restaurant-image">
                <button class="btn-small hoverable green right">3.9</button>
            </div>
            <div class="mobile-restaurant-info">
                <a href="#" class="card-title">Golden Fortune</a>
                <hr>
                <p class="card-content">
                    Ermita
                    <br>
                    Cuisine:&nbsp;Seafood, Chinese
                    <br>
                    Cost for two:&nbsp;PHP800
                    <br>
                    Hours:&nbsp;11am – 2:30pm, 5:30pm – 12 midnight (Mon-Sun)
                    <br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    Name: "MRestaurantCard",
    mounted() {
        M.AutoInit(); 
    }
}
</script>

<style scoped>
@import '../assets/css/SearchResult.css';
</style>