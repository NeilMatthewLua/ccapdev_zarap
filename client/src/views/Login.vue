<template>
    <div>
        <Navbar :hasSearch="false" :isLogged="false" :hasFilter="false"/>  
        <div class="container center margin-pushdown">
            <h1 class="black-text title-size">Log-in</h1>
            <div class="container center margin-top">
                <div class="container center">
                    <div class="column">
                        <div class="col s12" id="login" @click="print" method="post">
                            <!-- if wrong credentials, display error message -->
                            <p v-if="errors.length > 0">
                                <b>Invalid Credentials!</b>
                            </p>
                            <!-- login text area -->
                            <div class="column">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate" v-model="email">
                                    <label for="icon_prefix" class="black-text">Email</label>
                                </div>
                                <br>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="icon_telephone" type="tel" class="validate" v-model="password">
                                    <label for="icon_telephone"  class="black-text">Password</label>
                                </div>
                                <div class="waves-effect waves-light btn-large margin-bottom-small send-back-button colored-button white-text" @click="loadUser"> Sign me in!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <a href="/register" class="href black-text hovered-link">Register me!</a>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'Login',
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            errors: [],
            "email": null,
            "password": null
        }
      },
    methods:{
        loadUser: function() {
            this.$store.dispatch('login', {
                "email": this.email,
                "password": this.password
            })
        },
        print: function () {
            console.log(this.email + " " + this.password);
        }
    }
}
</script>

<style scoped>
    body {
        background-color:var(--default-background-color);
        display: flex;
        min-height: 100vh;
        flex-direction: column;
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
    }

    .hovered-link:hover {
        color: var(--default-navbar-color) !important;
        text-decoration: underline;
    }

    .white-text {
        color: white !important;
    }
</style>