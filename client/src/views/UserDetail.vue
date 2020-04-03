<template>
    <div>
        <Navbar :hasSearch="true" :hasFilter="false" ref="updateNav"/> 
        <!-- Container of menu and display info -->
        <div id="content" class="container-profile  hide-on-restaurant hide-on-review">
            <h3 class="center big-font onload">{{Title}}</h3>
            <div class="row pad-left">
                <!-- User Menu -->
                <UserMenu  @userProfile="updateUserPage"/>
                <!-- Display info for large -->
                <ProfilePage v-bind:class="{'editVisible': ProfileVisible}"
                @updateNavbar="updateNavbar" ref="resetEdit"/>
                <DiningHistoryPage  v-bind:class="{'editVisible': HistoryVisible}"/>
                <ReviewPage v-bind:class="{'editVisible': ReviewVisible}"/>
            </div>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ProfilePage from '@/components/userdetail/ProfilePage.vue';
import DiningHistoryPage from '@/components/userdetail/DiningHistoryPage.vue';
import ReviewPage from '@/components/userdetail/ReviewPage.vue';
import UserMenu from '@/components/userdetail/UserMenu.vue'; 
import { mapActions } from 'vuex'; 
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
            ProfileVisible: false,
            HistoryVisible: true,
            ReviewVisible: true,
            Title: ''
        }
    },
    created : function() {
        this.updateUserPage();
    },
    watch:{
    $route (){  
        this.updateUserPage();
        }
    },
    methods: {
        ...mapActions(['removeUnusedPictures']), 
        mounted() {
            this.updateUserPage();
        },
        reset() {
            return (this.$refs.resetEdit != undefined) ? this.$refs.resetEdit.resetPage() : undefined;
        },
        uploadFiles(files) {
            this.$set(this, "uploadedFiles", files);  
        },
        updateNavbar() {
            this.$refs.updateNav.checkLogged();
        },
        updateUserPage: function() {
            var action = this.$route.params.menu;
            if(action == 'profile') {
                this.Title = "Profile";
                this.ProfileVisible = false;
                this.reset(); 
                this.HistoryVisible = true;
                this.ReviewVisible = true;
            }
            if(action == 'myprofile') {
                this.Title = "My Profile";
                this.ProfileVisible = false;
                this.reset(); 
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
                this.Title = "Reviews"; 
                this.ProfileVisible = true;
                this.HistoryVisible = true;
                this.ReviewVisible = false;
            }
        }
    },
    async beforeRouteLeave(to, from, next) {  
        this.reset(); 
        if(this.$store.getters.getUser != null){ 
          await this.removeUnusedPictures(); 
        }
        next()
    }
}
</script>

<style scoped>
   .editVisible {
       display: none;
   }
</style>