<template>
    <div>
        <Navbar :hasSearch="true" :isLogged="false"/> 
        <!-- Container of menu and display info -->
        <div id="content" class="container-profile  hide-on-restaurant hide-on-review">
            <h3 class="center big-font onload">{{Title}}</h3>
            <div class="row pad-left">
                <!-- User Menu -->
                <UserMenu  @userProfile="updateUserPage"/>
                <!-- Display info for large -->
                <ProfilePage />
            </div>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import M from 'materialize-css';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import UserMenu from '@/components/UserMenu.vue';

export default {
    name: "UserDetail",
    components: {
        Navbar,
        Footer,
        ProfilePage,
        UserMenu
    },
    data() {
        return {
            Title: " ",
            isUserPageVisible: true,
            EditProfileVisible: true,
        }
    },
    mounted() {
        M.AutoInit(); 
    },
    methods: {
        updateUserPage: function(choice) {
            this.Title = choice;
        }
    }
}
</script>

<style>

</style>