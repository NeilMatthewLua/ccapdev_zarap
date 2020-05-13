<template>
    <div class="col s12 l2 squared margin-around hide-on-med-and-down">
        <div class="profile-container">
            <div class="text menu-font pad-menu" v-show="!this.verifyOwn()"><a @click="goMyProfile()" class="white-text hover-underline profile">Profile</a></div>
            <div class="text menu-font pad-menu" v-show="this.verifyOwn()"><a @click="goMyProfile()" class="white-text hover-underline profile">My Profile</a></div>
            <div class="text menu-font pad-menu"><a @click="goMyDining()" class="white-text hover-underline dining-history">Dining History</a></div>
            <div class="text menu-font pad-menu" v-show="!this.verifyOwn()"><a @click="goMyReviews()" class="white-text hover-underline my-reviews">Reviews</a></div>
            <div class="text menu-font pad-menu" v-show="this.verifyOwn()"><a @click="goMyReviews()" class="white-text hover-underline my-reviews">My Reviews</a></div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
import router from '@/router';

export default {
    name: "UserMenu",
    mounted() {
        M.AutoInit(); 
    },
    computed: {
        userID() {
            return this.$route.params.id; 
        }
    },
    methods: {
        verifyOwn() {
           if(this.$store.getters.getUser != null) {
               if(this.$route.params.id == this.$store.getters.getUser.userID) {
                    return true;
                }
           }
           return false;
        },
        goMyReviews() {
            this.$emit('reset');
            router.push({path:`/userdetail/${this.userID}/review`}).catch(() => {}); 
        },
        goMyDining() {
            this.$emit('reset');
            router.push({path: `/userdetail/${this.userID}/dining`}).catch(() => {}); 
        },
        goMyProfile() {
            this.$emit('reset');
            if(this.verifyOwn())
                router.push({path: `/userdetail/${this.userID}/myprofile`}).catch(() => {}); 
            else
                router.push({path: `/userdetail/${this.$route.params.id}/profile`}).catch(() => {}); 
        }
    }
}
</script>


<style scoped>
    #content {
        min-height: calc(100vh - 80px);
    }

    .squared {
        border : 1px solid var(--default-container-color);
        background-color: #2D2D2D;
        border-radius: 20px !important;
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