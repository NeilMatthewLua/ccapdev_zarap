<template>
    <div>
        <!-- Restaurant: Golden Fortune -->
        <div class="card horizontal" id="GoldenFortuneCardLarge">
            <div class="card-image">
                <img src="../../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune" class="restaurant-image">
            </div>
            <div class="restaurant-info">
                <div class="card-stacked">
                    <div class="card-content">
                        <p class="restaurant-establisment-type">{{resto.establishment_type}}</p>
                        <br>
                        <a href="#" class="restaurant-name">{{resto.name}}</a>
                        <br>
                        <p class="restaurant-location">{{resto.location}}</p>
                        <p class="restaurant-address">{{resto.address}}</p>
                        <br>
                        <p class="restaurant-other-info">Cuisine:&nbsp;{{resto.cuisines}}</p>
                        <p class="restaurant-other-info">Cost for two:&nbsp;{{resto.cost_two}}</p>
                        <p class="restaurant-other-info">Hours:&nbsp;{{resto.hours}}</p>
                        <p class="restaurant-other-info">Tel no:&nbsp;{{resto.phone}}</p>
                    </div>
                </div>
                <div class="card-content">
                    <button class="btn hoverable green">{{resto.rate}}/5</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    Name: "RestaurantName",
    data () {
        return {
            resto: {
                name: "Golden Fortune",
                establishment_type: "Casual Dining",
                location: "Ermita",
                address: "678 T.M. Kalaw Avenue, Ermita, Manila",
                cuisines: "Seafood, Chinese",
                cost_two: "PHP800",
                hours: "11am – 2:30pm, 5:30pm – 12 midnight (Mon-Sun)",
                phone: "02 85222288; 02 85222200",
                rate: "3.9"
            }
        }
    },
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