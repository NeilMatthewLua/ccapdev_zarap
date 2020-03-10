<template>
    <div class="col s12 l2 squared margin-around hide-on-med-and-down">
        <div class="profile-container">
            <div class="text menu-font pad-menu"><a href="#" class="white-text hover-underline profile" @click="userMenu('My Profile', 'profile')">My Profile</a></div>
            <div class="text menu-font pad-menu"><a href="#" class="white-text hover-underline dining-history"  @click="userMenu('Dining History', 'dining')">Dining History</a></div>
            <div class="text menu-font pad-menu"><a href="#myreviews" class="white-text hover-underline my-reviews" @click="userMenu('My Reviews', 'review')">My Reviews</a></div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    name: "EditProfile",
    mounted() {
        M.AutoInit(); 
    },
    methods: {
        userMenu(choice, action) {
            this.$emit('userProfile', choice, action);
        }
    }
}
</script>


<style scoped>
    body {
        background-color: #F4F4F2;
    }

    #content {
        min-height: calc(100vh - 80px);
    }

    .squared {
        border : 1px solid var(--default-container-color);
        background-color: #2D2D2D;
        border-radius: 20px !important;
    }

    :root {
        --default-button-color: #CB202D;
        --default-navbar-color: #CB202D;
        --default-container-color: #2D2D2D;
    }


    .margin-around {
        margin-left: 2% !important;
        margin-right: 2% !important;
    }

    .colored-button {
        background-color: var(--default-button-color) !important;
    }

    .pad-left {
        padding-left: 10%;
        margin-bottom: 50px;
    }

    .big-font {
        font-size: 3vw;
    }

    .menu-font {
        font-size: 35px;
    }

    .padd-top {
        padding-top: 3%;
    }

    .info-font {
        font-size: 18px !important;
    }

    .pad-menu {
        padding-top: 5%;
        padding-left: 5%;
    }

    .profile-container {
        margin-top: 3%;
        margin-left: 2%;
        padding-bottom: 3%;
    }

    .padd-bottom {
        margin-top: 4%;
        margin-bottom: 5%;
    }

    .margin-right {
        margin-right: 10px;
    }

    .grouped-info {
        display: flex;
    }

    .pad-right-text { 
        padding-right: 20px;
    }

    .remove-margin {
        margin: 0;
    }

    .hover-underline:hover {
        text-decoration: underline;
    }

    .relative-position {
        position: relative;
    }

    .corner-bottom-right {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }

    .corner-bottom-right-review {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .padinput {
        padding-left: 10px !important;
        box-sizing: border-box;
        border-radius: 8px !important;
    }

    @media(max-width: 1830px) {
        .menu-font, .info-font {
            font-size: 25px;
        }
    }

    @media(max-width: 1500px) {
        .menu-font, .info-font {
            font-size: 22px;
        }
    }

    @media(max-width: 1350px) {
        .menu-font, .info-font {
            font-size: 18px;
        }
    }

    @media(max-width: 1030px) {
        .menu-font, .info-font {
            font-size: 16px;
        }
    }

    @media(max-width: 900px) {
        .menu-font, .info-font {
            font-size: 18px;
        }
    }
</style>