<template>
    <div>
        <!-- Restaurant List for Desktop View -->
        <div class="hide-on-small-only">
            <div class="restaurant-list">
                <!-- Restaurant Cards for Desktop View -->
                <div class="card horizontal">
                    <div class="card-image">
                        <img :alt="resto.name" :src="this.$store.getters.fetchCoverPic(resto.defaultPicture)[0].url"  class="restaurant-image">
                    </div>
                    <div class="restaurant-info">
                        <div class="card-stacked">
                            <div class="card-content">
                                <p class="restaurant-establishment-type">{{resto.establishmentType[0]}}</p>
                                <br>
                                <a :href="url" class="restaurant-name">{{resto.name}}</a>
                                <br>
                                <p class="restaurant-location">{{resto.city}}</p>
                                <p class="restaurant-address">{{resto.fullAddress}}</p>
                                <br>
                                <p class="restaurant-other-info">Cuisine:&nbsp;{{resto.cuisines[0]}}</p>
                                <p class="restaurant-other-info">Cost for two:&nbsp;Php{{resto.costForTwo}}</p>
                                <p class="restaurant-other-info">{{getToday()}}:&nbsp; {{resto.operatingHours[getToday()]}}
                                    <a>
                                        <i class="material-icons tiny"  @click="openModal()">info</i>
                                    </a>
                                </p>
                                <p class="restaurant-other-info">Tel no:&nbsp;{{resto.contactDetails}}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <button class="btn hoverable green">{{resto.overallRating}}/5</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- Restaurant List for Mobile and Tablet View -->
        <div class="hide-on-med-and-up">
            <div class="mobile-restaurant-list">
                <!-- Restaurant Cards for Mobile and Tablet View -->
                <div class="card">
                    <div class="card-image">
                        <img :alt="resto.name" :src="this.$store.getters.fetchCoverPic(resto.defaultPicture)[0].url" class="mobile-restaurant-image">
                        <button class="btn-small hoverable green right">{{resto.overallRating}}</button>
                    </div>
                    <div class="mobile-restaurant-info">
                        <a :href="url" class="card-title">{{resto.name}}</a>
                        <hr>
                        <p class="card-content">
                            {{resto.city}}
                            <br>
                            Cuisine:&nbsp;{{resto.cuisines[0]}}
                            <br>
                            Cost for two:&nbsp;{{resto.costForTwo}}
                        </p>
                        <p class="restaurant-other-info">{{getToday()}}:&nbsp; {{resto.operatingHours[getToday()]}}
                            <a>
                                <i class="material-icons tiny"  @click="openModal()">info</i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import { mapGetters } from 'vuex'; 
import M from 'materialize-css';
export default {
    name: "RestaurantCard",
    props : {
        resto : Object
    },
    data () {
        return {
            currRestoId: null,
            url: "/restaurant/" + this.resto.restaurantID
        }
    },
    methods: {
        ...mapGetters(["fetchCoverPic"]),
        getToday() {
            var d = new Date();
            // Returns the actual String of the date to be represented:
            // Sunday = 0, Monday = 1, etc.
            // WARNING: Make sure to use the appropriate string when used as keys
            return d.toLocaleString('en-us', {  weekday: 'long' });
        },
        openModal() {
            // Show the modal and delegate the responsibility to the parent class
            this.$emit("did_click_operating_info", this.resto.restaurantID);
        }
    },
    mounted() {
        M.AutoInit();
    }
}
</script>

<style scoped>
    .restaurant-list {
        padding-left: 2%;
        padding-right: 2%;
        width: 95%;
        margin-right: 5%;
    }

    .restaurant-list > .card {
        width: 70vw;
        height: 400px;
        margin-left: 2%;
    }

    .restaurant-list > .card-image {
        /* width: 95%;
        height: 440px; */
        min-width: 35vw;
        min-height: 400px;
        max-width: 35vw;
        max-height:400px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        object-fit: fill;
    }

    .restaurant-image {
        padding: 2%;
        min-width: 35vw;
        min-height: 400px;
        max-width: 35vw;
        max-height: 400px;
    }

    .card-stacked {
        width: 30vw;
        height: 400px;
    }

    .card-stacked > .card-content {
        padding-left: 2%;
        margin-left: 2%;
        width: 30vw;
        height: 400px;
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
        transition: color 0.3s ease-in-out;
    }
    
    .restaurant-name:hover {
        color: red; 
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
        height: 400px
    }

    .card-content > .btn {
        position: absolute;
        right:20px;
        top:10px;
        width: 66px;
        height: 36px;
    }

    .card-image > button {
        position: absolute;
        right:0px;
        top:0px;
        width: 66px;
        height: 36px;
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
        min-width: 100%;
        min-height: 200px;
        max-width: 100%;
        max-height: 200px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        object-fit: fill;
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
    }

    .mobile-restaurant-info > .operating-day {
        font-size: 70%;
        color: var(--default-mobile-restaurant-info-color);
        text-align: left !important;
        padding-left: 3%;
        margin-top: -10px;
        padding-top: 0px;
    }

    i {
        cursor: pointer;
    }
</style>