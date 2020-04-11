<template>
    <div>
        <Navbar :hasSearch="false" :hasFilter="false"/>  
        <div class="container center margin-pushdown">
            <h1 class="black-text title-size">Log-in</h1>
            <div class="container center margin-top">
                <div class="container center">
                    <div class="column">
                        <div class="col s12" id="login">
                            <!-- if wrong details, display error message -->
                            <p v-if="errors.length">
                                <b class="errormsg">Please correct the following error(s):</b>
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>

                            <!-- login text area -->
                            <div class="column">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate pad-input" v-model="email">
                                    <label for="icon_prefix" class="black-text">Email</label>
                                </div>
                                <br>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="icon_telephone"  type="password"  class="validate pad-input" v-model="password">
                                    <label for="icon_telephone"  class="black-text">Password</label>
                                </div>
                                <div class="waves-effect waves-light btn-large margin-bottom-small send-back-button colored-button white-text" @click="validateForm"> Sign me in!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <a @click="goRegister" class="href black-text hovered-link">Register me!</a>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import router from '../router';

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
        goRegister: function() {
            router.push({name: "Register"});
        },
        validateForm: function() {
            this.errors = [];
            if(!this.email) {
                this.errors.push('Email required');
            }
            if(!this.password) {
                this.errors.push('Password required');
            }

            if(!this.errors.length) {
                this.loadUser();
                return true;
            }
        },
        loadUser: function() {
            this.errors = [];
            this.$store
                .dispatch('login', {
                    "email": this.email,
                    "password": this.password
                    })
                .then(() => {
                    router.push({name: "Home"});
                })
                .catch(() => {
                    this.errors.push('Invalid Credentials!');
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

    .pad-input {
        padding-left: 10px !important;
    }

    .errorColor {
        color: var(--default-error-color)
    }
</style>