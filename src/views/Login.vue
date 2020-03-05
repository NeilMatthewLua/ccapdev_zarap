<template>
    <div>
        <Navbar :hasSearch="true" :isLogged="false"/>  
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
                            <input class=" white-text waves-effect waves-light btn-large colored-button margin-bottom-small send-back-button" type="submit" value="Sign me in!">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br>
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

<style>
    @import '../assets/css/login.css';
    @import '../assets/css/style.css';
</style>