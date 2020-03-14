<template>
    <div>
        <!-- Restaurant: Golden Fortune -->
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
    .restaurant-list > .card {
        width: 100%;
    }

    .restaurant-list > .card-image {
        width: 95%;
        height: 440px;
    }

    .restaurant-image {
        padding: 2%;
        min-width: 350px;
        min-height: 440px;
        max-width: 350px;
        max-height: 440px;
    }

    .card-stacked > .card-content {
        padding-left: 2%;
        margin-left: 2%;
    }

    .restaurant-info {
        display: flex;
        margin-left: 5%;
        margin-right: 0%;
        padding-right: 0%;
    }

    .restaurant-establisment-type {
        font-size: 120%;
    }

    .restaurant-name {
        font-size:180%;
    }

    .restaurant-location {
        font-size:110%;
    }

    .restaurant-address {
        font-size:100%;
    }

    .restaurant-other-info {
        font-size:90%;
    }

    .restaurant-info > .card-content {
        margin-left: 1%;
        padding-left: 0%;
        padding-right: 2%;
    }

    .card-content > .btn {
        position: absolute;
        right:20px;
        top:10px;
    }

    .card-image > button {
        position: absolute;
        right:0px;
        top:0px;
    }
</style>