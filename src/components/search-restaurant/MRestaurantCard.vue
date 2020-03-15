<template>
    <div>
        <div class="card" id="GoldenFortuneCardSmall">
            <div class="card-image">
                <img src="../../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune" class="mobile-restaurant-image">
                <button class="btn-small hoverable green right">{{mresto.rate}}</button>
            </div>
            <div class="mobile-restaurant-info">
                <a href="#" class="card-title">{{mresto.name}}</a>
                <hr>
                <p class="card-content">
                    {{mresto.location}}
                    <br>
                    Cuisine:&nbsp;{{mresto.cuisines}}
                    <br>
                    Cost for two:&nbsp;{{mresto.cost_two}}
                    <br>
                    Hours:&nbsp;{{mresto.hours}}
                    <br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    name: "MRestaurantCard",
    data () {
        return{
            mresto: {
                name: "Golden Fortune",
                location: "Ermita",
                cuisines: "Seafood, Chinese",
                cost_two: "PHP800",
                hours: "11am – 2:30pm, 5:30pm – 12 midnight (Mon-Sun)",
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
    :root {
        --default-mobile-restaurant-info-color: #808080;
    }

    .restaurant-list > .card {
        width: 100%;
    }

    .restaurant-list > .card-image {
        width: 95%;
        height: 440px;
    }

    .card-stacked > .card-content {
        padding-left: 2%;
        margin-left: 2%;
    }

    .mobile-restaurant-list {
        padding-left: 2%;
        padding-right: 2%;
        margin: 2%;
        width: 95%;
    }

    .mobile-restaurant-list > .card {
        width: 100%;
        height: 300px;
        margin-left: 2%;
        margin-right: 2%;
        padding-right: 2%;
        padding-left: 2%;
    }

    .mobile-restaurant-list > .card-image {
        width: 95%;
        height: 150px;
    }

    .mobile-restaurant-image {
        padding: 2%;
        min-width: 100%;
        min-height: 200px;
        max-width: 100%;
        max-height: 200px;
    }

    .mobile-restaurant-info > .card-title {
        font-size: 90%;
        text-align: center !important;
        padding-left: 3%;
    }

    .mobile-restaurant-info > .card-content {
        font-size: 70%;
        color: var(--default-mobile-restaurant-info-color);
        text-align: left !important;
        padding: 0px;
        padding-left: 3%;
        padding-bottom: 3%;
    }

    .card-image > button {
        position: absolute;
        right:0px;
        top:0px;
    }
</style>