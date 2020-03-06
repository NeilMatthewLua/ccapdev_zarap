<template>
    <div>
        <Navbar :hasSearch="false" :isLogged="false"/>  
        <div class="container center margin-pushdown">
            <h1 class="black-text title-size">Log-in</h1>
            
            <div class="container center margin-top">
                <div class="container center">
                    <div class="column">
                        <!-- <form class="col s12" id="login" @submit="checkForm" action="" method="post" > -->
                        <form class="col s12" id="login" @submit="print" method="post">
                            <!-- if wrong credentials, display error message -->
                            <!-- <p v-if="errors">
                                <b>Invalid Credentials!</b>
                            </p> -->
                            <!-- login text area -->
                            <div class="column">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">account_circle</i>
                                    <!-- <input id="icon_prefix" type="text" class="validate"> -->
                                    <input id="icon_prefix" type="text" class="validate" v-model="username">
                                    <label for="icon_prefix" class="black-text">Username</label>
                                </div>
                                <br>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">lock</i>
                                    <!-- <input id="icon_telephone" type="tel" class="validate"> -->
                                    <input id="icon_telephone" type="tel" class="validate" v-model="password">
                                    <label for="icon_telephone"  class="black-text">Password</label>
                                </div>
                            <input class="waves-light btn-large margin-bottom-small send-back-button colored-button" type="submit" value="Sign me in!">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br>
            <a href="register.html" class="href black-text hovered-link">Register me!</a>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import M from 'materialize-css';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'Login',
    components: {
        Navbar,
        Footer
    },
    mounted() {
        M.AutoInit(); 
    },
    data() {
        return {
            errors: [],
            username: null,
            password: null
        }
      },
    methods:{
        print: function (e) {
            console.log(this.username + " " + this.password);
            e.preventDefault();
        }
    }
}
</script>

<style scoped>
    /* body {
        background-color: #F4F4F2;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    :root {
        --default-button-color: #CB202D;
        --default-navbar-color: #CB202D;
    }

    .margin-pushdown {
        margin-bottom: 2vw;
    }

    .padnav {
        padding-left: 15px;
        background-color: var(--default-navbar-color);
    }

    .title-size {
        font-size:8vw;
    }

    .margin-top {
        margin-top: 6vw;
    }

    .colored-button {
        background-color: var(--default-button-color) !important;
        color: var(--default-buttontext-color) !important;
    }

    .hovered-link:hover {
        color: var(--default-navbar-color) !important;
        text-decoration: underline;
    } */
@import '../assets/css/login.css';
</style>