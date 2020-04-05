<template>
    <div>
        <!-- Restaurant List for Desktop View -->
        <div class="hide-on-small-only">
            <div class="restaurant-list">
                <!-- Restaurant Cards for Desktop View -->
                <div class="horizontal card"  :class="{'profile': !inSearch}">
                    <div :class="{'card-image': inSearch, 'card-image-profile': !inSearch}">
                        <img :alt="resto.name" :src="this.$store.getters.fetchCoverPic(resto.defaultPicture)[0].url"  :class="{'restaurant-image': inSearch, 'restaurant-image-profile': !inSearch}">
                    </div>
                    <div class="restaurant-info">
                        <div :class="{'card-stacked': inSearch, 'card-stacked-profile': !inSearch}">
                            <div :class="{'card-content': inSearch, 'card-content-profile': !inSearch}">
                                <p :class="{'restaurant-establishment-type' : inSearch, 'restaurant-establishment-type-profile': !inSearch}">{{resto.establishmentType[0]}}</p>
                                <br v-show="inSearch">
                                <a :class="{'restaurant-name': inSearch, 'restaurant-name-profile': !inSearch}" @click="goResto()">{{resto.name}}</a>
                                <br v-show="inSearch">
                                <p :class="{'restaurant-location': inSearch, 'restaurant-location-profile': !inSearch}">{{resto.city}}</p>
                                <p :class="{'restaurant-address': inSearch, 'restaurant-address-profile': !inSearch}">{{resto.fullAddress}}</p>
                                <br v-show="inSearch">
                                <p :class="{'restaurant-other-info': inSearch, 'restaurant-other-info-profile': !inSearch}">Cuisine:&nbsp;{{resto.cuisines[0]}}</p>
                                <p :class="{'restaurant-other-info': inSearch, 'restaurant-other-info-profile': !inSearch}">Cost for two:&nbsp;Php{{resto.costForTwo}}</p>
                                <p :class="{'restaurant-other-info': inSearch, 'restaurant-other-info-profile': !inSearch}">{{getToday()}}:&nbsp; {{resto.operatingHours[getToday()]}}
                                    <a>
                                        <i class="material-icons tiny"  @click="openModal()">info</i>
                                    </a>
                                </p>
                                <p :class="{'restaurant-other-info': inSearch, 'restaurant-other-info-profile': !inSearch}">Tel no:&nbsp;{{resto.contactDetails}}</p>
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
                        <a class="card-title" @click="goResto()">{{resto.name}}</a>
                        <hr>
                        <p class="card-content">
                            {{resto.city}}
                            <br>
                            Cuisine:&nbsp;{{resto.cuisines[0]}}
                            <br>
                            Cost for two:&nbsp;{{resto.costForTwo}}
                            <br>
                            {{getToday()}}:&nbsp; {{resto.operatingHours[getToday()]}}
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
import router from '../../router';
import M from 'materialize-css';
export default {
    name: "RestaurantCard",
    props : {
        resto : Object
    },
    data () {
        return {
            currRestoId: null,
            inSearch: false
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
        },
        goResto() {
            router.push({path: `/restaurant/${this.resto.restaurantID}`});
        },
        isInSearch() {
            this.$route.name == "Search Result" ? this.inSearch = true : this.inSearch = false;
        }
    },
    mounted() {
        M.AutoInit();
        this.isInSearch();
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

    .restaurant-list > .profile {
        width: 60vw;
        height: 300px;
        margin-left: 2%;
    }

    .restaurant-list > .card-image-profile {
        /* width: 95%;
        height: 440px; */
        min-width: 20vw;
        min-height: 300px;
        max-width: 20vw;
        max-height: 300px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        object-fit: fill;
    }

    .restaurant-image-profile {
        padding: 2%;
        min-width: 20vw;
        min-height: 300px;
        max-width: 20vw;
        max-height: 300px;
    }

    .card-stacked-profile {
        width: 25vw;
        height: 300px;
    }

    .card-stacked-profile > .card-content-profile {
        padding-left: 2%;
        margin-left: 2%;
        width: 25vw;
        height: 300px;
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

    .restaurant-establishment-type-profile {
        font-size: 90%;
    }

    .restaurant-name {
        font-size:180%;
        transition: color 0.3s ease-in-out;
    }
    
    .restaurant-name:hover {
        color: red; 
    }

    .restaurant-name-profile {
        font-size:150%;
        transition: color 0.3s ease-in-out;
    }
    
    .restaurant-name-profile:hover {
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

    .restaurant-location-profile {
        font-size:80%;
    }

    .restaurant-address-profile {
        font-size:70%;
    }

    .restaurant-other-info-profile {
        font-size:70%;
        margin:1%;
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

    .mobile-restaurant-image-Search {
        padding: 2%;
        min-width: 35%;
        min-height: 300px;
        max-width: 35%;
        max-height: 300px;
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