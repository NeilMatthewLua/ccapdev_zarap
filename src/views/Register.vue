<template>
    <div>
        <Navbar :hasSearch="false" :isLogged="false"/>  
            <div class="container">
                <div class="container">
                    <h1 class ="black-text title-size">Register</h1>
                    <div class="row">
                        <div class="col s12" id="login">
                            <!-- if wrong details, display error message -->
                            <p v-if="errors.length">
                                <b class="errormsg">Please correct the following error(s):</b>
                                <ul>
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>

                            <!-- register text area -->
                            <div class="row">
                                <div class="input-field col s6">
                                <input id="first_name" type="text" class="validate" v-model="firstname">
                                <label for="first_name">First Name</label>
                                </div>
                                <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate" v-model="lastname">
                                <label for="last_name">Last Name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="password" type="password" class="validate" v-model="password">
                                <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="email" type="email" class="validate" v-model="email">
                                <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="address" type="text" class="validate" v-model="homeaddress">
                                <label for="address">Home Address</label>
                                </div>
                            </div>
                            <div class="center margin-pushdown">
                            <div class="waves-effect waves-light btn-large btncolor" @click="validateForm"> Sign me up!
                            </div>
                        </div>
                    </div>
                </div>
                </div>
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
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            homeaddress: null
        }
      },
    methods:{
        print: function () {
            console.log(this.firstname + " " + this.email + " " + this.lastname + " " + this.homeaddress + " " + this.password);
        },
        validateForm: function () {
            this.errors = [];

            if(!this.firstname) {
                this.errors.push('First name required');
            }
            if(!this.lastname) {
                this.errors.push('Last name required');
            }
            if(!this.email) {
                this.errors.push('Email required');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required');
            }
            if(!this.password) {
                this.errors.push('Password required');
            }
            if(!this.homeaddress) {
                this.errors.push('Home Address required');
            }
            this.print();
            if(!this.errors.length) {
                return true;
            }
            return false;
        },
        validEmail: function (email) {
             var re = /\S+@\S+\.\S+/;
             return re.test(String(email).toLowerCase());
        }
    }   
}
</script>

<style>
    body {
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

    .padinput {
        padding-left: 10px !important;
        box-sizing: border-box;
        border-radius: 4px !important;
    }

    .btncolor {
        background-color: var(--default-button-color) !important;
    }

    .hover:hover {
        color: var(--default-navbar-color) !important;
        text-decoration: underline;
    }

    .title-size {
        font-size:5vw;
    }

    .errormsg {
        color: var(--default-button-color);
    }

</style>