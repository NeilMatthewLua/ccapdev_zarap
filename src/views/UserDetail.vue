<template>
    <div>
        <Navbar :hasSearch="true" :isLogged="true"/> 
        <!-- Container of menu and display info -->
        <div id="content" class="container-profile  hide-on-restaurant hide-on-review">
            <h3 class="center big-font onload">{{Title}}</h3>
            <div class="row pad-left">
                <!-- User Menu -->
                <UserMenu  @userProfile="updateUserPage"/>
                <!-- Display info for large -->
                <ProfilePage v-bind:class="{'editVisible': ProfileVisible}"/>
                <DiningHistoryPage  v-bind:class="{'editVisible': HistoryVisible}"/>
                <ReviewPage  v-bind:class="{'editVisible': ReviewVisible}"/>
            </div>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import M from 'materialize-css';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ProfilePage from '@/components/userdetail/ProfilePage.vue';
import DiningHistoryPage from '@/components/userdetail/DiningHistoryPage.vue';
import ReviewPage from '@/components/userdetail/ReviewPage.vue';
import UserMenu from '@/components/userdetail/UserMenu.vue';

export default {
    name: "UserDetail",
    components: {
        Navbar,
        Footer,
        ProfilePage,
        DiningHistoryPage,
        ReviewPage,
        UserMenu
    },
    data() {
        return {
            // isUserPageVisible: true,
            // EditProfileVisible: true,
            ProfileVisible: true,
            HistoryVisible: true,
            ReviewVisible: true,
        }
    },
    created : function() {
        this.updateUserPage();
    },
    methods: {
        mounted() {
            M.AutoInit(); 
            this.updateUserPage();
        },
        updateUserPage: function() {
            var action = this.$route.params.menu;
            //TODO "My" only for logged in
            if(action == 'profile') {
                this.Title = "My Profile";    
                this.ProfileVisible = false;
                this.HistoryVisible = true;
                this.ReviewVisible = true;
            }
            else if(action == 'dining') {
                this.Title = "Dining History";    
                this.ProfileVisible = true;
                this.HistoryVisible = false;
                this.ReviewVisible = true;
            }
            else if(action == 'review') {
                this.Title = "My Reviews";    
                this.ProfileVisible = true;
                this.HistoryVisible = true;
                this.ReviewVisible = false;
            }
        }
    }
}
</script>

<style scoped>
   .editVisible {
       display: none;
   }
</style>