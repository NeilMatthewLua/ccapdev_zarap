<template>
    <div class="col s12 l2 square margin-around hide-on-med-and-down">
        <div class="profile-container">
        <div class="text menu-font pad-menu"><a href="#" class="white-text hover-underline profile" @click="userMenu(profile)">My Profile</a></div>
        <div class="text menu-font pad-menu"><a href="#" class="white-text hover-underline dining-history"  @click="userMenu(dining)">Dining History</a></div>
        <div class="text menu-font pad-menu"><a href="#" class="white-text hover-underline my-reviews" @click="userMenu(review)">My Reviews</a></div>
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
        userMenu(choice) {
            this.$emit('userProfile', choice);
        }
    }
}
</script>

<style>
    @import '../assets/css/userdetail.css'; 
</style>