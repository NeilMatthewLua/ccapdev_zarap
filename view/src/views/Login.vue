<template>
    <div>
        <Navbar :hasSearch="false" :hasFilter="false"/>  
        <div class="container center margin-pushdown">
            <h1 class="black-text title-size">Log-in</h1>
            <div class="container center margin-top">
                <div class="container center">
                    <div class="column" v-show="!isLoading">
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
                                    <input v-on:keyup.enter="validateForm" id="icon_prefix" type="text" class="validate pad-input" v-model="email">
                                    <label for="icon_prefix" class="black-text">Email</label>
                                </div>
                                <br>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">lock</i>
                                    <input v-on:keyup.enter="validateForm" id="icon_telephone"  type="password"  class="validate pad-input" v-model="password">
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
            <a @click="goRegister" class="href black-text hovered-link" v-show="!isLoading">Register me!</a>
        </div>
        <loadModal v-show="isLoading"/>
        <Footer /> 
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import loadModal from '@/components/loadModal.vue';
import router from '../router';

export default {
    name: 'Login',
    components: {
        Navbar,
        Footer,
        loadModal
    },
    data() {
        return {
            errors: [],
            "email": null,
            "password": null,
            isLoading: false
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
            this.isLoading = true;
            this.errors = [];
            this.$store
                .dispatch('login', {
                    "email": this.email,
                    "password": this.password
                    })
                .then(() => {
                    this.isLoading = false;
                    router.push({name: "Home"});
                })
                .catch(() => {
                    this.isLoading = false;
                    this.errors.push('Invalid Credentials!');
                })
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