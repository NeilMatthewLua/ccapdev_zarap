<template>
    <div>
        <Navbar :hasSearch="false" :isLogged="false"/>  
            <div class="container">
                <div class="container">
                    <h1 class ="black-text title-size">Register</h1>
                    <div class="row">
                        <form class="col s12" id="login" @submit="validateForm" >
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
                                <input class="waves-light btn-large btncolor" type="submit" value="Sign me up!">
                            </div>
                        </form>
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
        print: function (e) {
            console.log(this.firstname + " " + this.email + " " + this.lastname + " " + this.homeaddress + " " + this.password);
            e.preventDefault();
        },
        validateForm: function (e) {
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
            this.print(e);
            if(!this.errors.length) {
                return true;
            }


            e.preventDefault();
            return false;
        },
        validEmail: function (email) {
             var re = /\S+@\S+\.\S+/;
             return re.test(String(email).toLowerCase());
        }
    }   
}
</script>

<style scoped>
    @import '../assets/css/register.css'; 
</style>