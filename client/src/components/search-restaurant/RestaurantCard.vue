<template>
    <div>
        <!-- Restaurant List for Desktop View -->
        <div class="hide-on-small-only">
            <div class="restaurant-list">
                <!-- Restaurant Cards for Desktop View -->
                <div class="card horizontal" id="GoldenFortuneCardLarge">
                    <div class="card-image">
                        <img src="../../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune" class="restaurant-image">
                    </div>
                    <div class="restaurant-info">
                        <div class="card-stacked">
                            <div class="card-content">
                                <p class="restaurant-establishment-type">{{resto.establishment_type}}</p>
                                <br>
                                <a href="/restaurant" class="restaurant-name">{{resto.name}}</a>
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
                                <!-- Restaurant Cards for Desktop View -->
                <div class="card horizontal" id="GoldenFortuneCardLarge">
                    <div class="card-image">
                        <img src="../../assets/pictures/TastyDumplings/TastyDumplingsProfile.jpg" alt="Golden Fortune" class="restaurant-image">
                    </div>
                    <div class="restaurant-info">
                        <div class="card-stacked">
                            <div class="card-content">
                                <p class="restaurant-establishment-type">{{resto.establishment_type}}</p>
                                <br>
                                <a href="/restaurant" class="restaurant-name">{{resto.name}}</a>
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
                                <!-- Restaurant Cards for Desktop View -->
                <div class="card horizontal" id="GoldenFortuneCardLarge">
                    <div class="card-image">
                        <img src="../../assets/pictures/Yabu/YabuProfile.png" alt="Golden Fortune" class="restaurant-image">
                    </div>
                    <div class="restaurant-info">
                        <div class="card-stacked">
                            <div class="card-content">
                                <p class="restaurant-establishment-type">{{resto.establishment_type}}</p>
                                <br>
                                <a href="/restaurant" class="restaurant-name">{{resto.name}}</a>
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
                                                <!-- Restaurant Cards for Desktop View -->
                <div class="card horizontal" id="GoldenFortuneCardLarge">
                    <div class="card-image">
                        <img src="../../assets/pictures/bryan.jpg" alt="Golden Fortune" class="restaurant-image">
                    </div>
                    <div class="restaurant-info">
                        <div class="card-stacked">
                            <div class="card-content">
                                <p class="restaurant-establishment-type">{{resto.establishment_type}}</p>
                                <br>
                                <a href="/restaurant" class="restaurant-name">{{resto.name}}</a>
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
        </div>
        
        <!-- Restaurant List for Mobile and Tablet View -->
        <div class="hide-on-med-and-up">
            <div class="mobile-restaurant-list">
                <!-- Restaurant Cards for Mobile and Tablet View -->
                <div class="card" id="GoldenFortuneCardSmall">
                    <div class="card-image">
                        <img src="../../assets/pictures/Golden Fortune-1.jpg" alt="Golden Fortune" class="mobile-restaurant-image">
                        <button class="btn-small hoverable green right">{{resto.rate}}</button>
                    </div>
                    <div class="mobile-restaurant-info">
                        <a href="/restaurant" class="card-title">{{resto.name}}</a>
                        <hr>
                        <p class="card-content">
                            {{resto.location}}
                            <br>
                            Cuisine:&nbsp;{{resto.cuisines}}
                            <br>
                            Cost for two:&nbsp;{{resto.cost_two}}
                            <br>
                            Hours:&nbsp;{{resto.hours}}
                            <br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

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
    }
}
</script>

<style scoped>
    .restaurant-list > .card {
        width: 100%;
        margin-left: 3%;
    }

    .restaurant-list > .card-image {
        /* width: 95%;
        height: 440px; */
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
    }

    .restaurant-image {
        /* padding: 2%;
        min-width: 350px;
        min-height: 440px;
        max-width: 350px;
        max-height: 440px; */
        padding: 2%;
        height: 300px;
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

    .restaurant-establishment-type {
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

    .mobile-restaurant-list {
        padding-left: 2%;
        padding-right: 2%;
        margin: 2%;
        width: 95%;
    }

    .mobile-restaurant-list > .card {
        width: 100%;
        height: 320px;
        margin-left: 2%;
        margin-right: 2%;
        padding-right: 2%;
        padding-left: 2%;
    }

    .mobile-restaurant-list > .card-image {
        /* width: 95%;
        height: 150px; */
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
    }

    .mobile-restaurant-image {
        /* padding: 2%;
        min-width: 100%;
        min-height: 200px;
        max-width: 100%;
        max-height: 200px; */
        padding: 2%;
        height: 200px;
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
    }
</style>