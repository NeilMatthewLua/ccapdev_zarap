<template>
    <div>
        <Navbar :hasSearch="false" :hasFilter="false"/>  
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

                            <!-- Register text area -->
                            <div class="row">
                                <div class="input-field col s6">
                                <input id="first_name" type="text" class="validate" v-model="user.firstname">
                                <label for="first_name">First Name</label>
                                </div>
                                <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate" v-model="user.lastname">
                                <label for="last_name">Last Name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="password" type="password" class="validate" v-model="user.password">
                                <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="confirm_password" type="password" class="validate" v-model="confirm_password">
                                <label for="confirm_password">Confirm Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="email" type="email" class="validate" v-model="user.email">
                                <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="address" type="text" class="validate" v-model="user.homeaddress">
                                <label for="address">Home Address</label>
                                </div>
                            </div>
                            <div class="row">
                                 <!-- File Upload Portion -->
                                <ImageUpload ref="uploadSection" :isBlack="true" @toggleSubmit="this.toggleSubmitButton" 
                                :dest="profilePictures" :singleUpload="true" :existingPics="this.fetchUploadedPics()" 
                                />
                            </div>
                            <div v-show='submitVisible'>
                                <div class="center margin-pushdown bring_back">
                                    <div class="waves-effect waves-light btn-large btncolor" @click="validateForm"> Sign me up!
                                    </div>
                                </div>
                                <alertModal                
                                    :message= "message" 
                                    v-show="isModalVisible"
                                    @close="closeModal"
                                    class="bring_front"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer /> 
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ImageUpload from '@/components/ImageUpload'; 
import alertModal from '@/components/alertModal';
import router from '../router'

export default {
    name: 'Register',
    components: {
        Navbar,
        Footer,
        ImageUpload,
        alertModal
    },
    data() {
        return {
            isModalVisible: false,
            submitVisible: false,
            errors: [],
            user: {
                "firstname": null,
                "lastname": null,
                "email": null,
                "password": null,
                "homeaddress": null,
                "uploadedFiles": []
            },
            confirm_password: null,
            profilePictures: "profilePictures",
            message: "Thanks for registering! We'll bring you back to the home page now!"
        }
    },
    methods:{
        ...mapActions(['removeUnusedPictures']),
        ...mapGetters(['fetchUploadedPics']),
        ...mapMutations(['setUploadedPics']),
        showModal() { //confirmation of successful registration
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.reset();
            router.push({name: "Home"});
        },
        reset() {
            this.setUploadedPics([]),
            this.user.firstname =  null,
            this.user.lastname =  null,
            this.user.password =  null,
            this.user.homeaddress =  null,
            this.user.email =  null,
            this.confirm_password = null,
            this.errors = []
        },
        toggleSubmitButton: function(value) {
            this.submitVisible = value
        },
        print: function () {
            console.log(this.user.firstname + " " + this.user.email + " " + this.user.lastname + " " + this.user.homeaddress + " " + this.user.password);
        },
        validateForm: async function () {
            this.errors = [];
            if(!this.user.firstname) {
                this.errors.push('First name required');
            }
            if(!this.user.lastname) {
                this.errors.push('Last name required');
            }
            if(!this.user.email) {
                this.errors.push('Email required');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('Valid email required');
            }
            if(!this.user.password) {
                this.errors.push('Password required');
            }
            else {
                if(!this.confirm_password) {
                    this.errors.push('Confirm Password required');
                }
                else if(this.user.password != this.confirm_password){
                    this.errors.push('Confirm Password does not match Password');
                }
            }
            if(!this.user.homeaddress) {
                this.errors.push('Home Address required');
            }
            if(this.fetchUploadedPics() == 0){
                this.errors.push('Profile Picture required');
            }
            if(!this.errors.length) {
                this.saveUser();
                return true;
            }
            else {
                await this.removeUnusedPictures();
                this.setUploadedPics([]);
                this.confirm_password = '';
                this.uploadSection();
            }
        },
        uploadSection() {
            return (this.$refs.uploadSection != undefined) ? this.$refs.uploadSection.reset(true, []) : undefined; 
        },
        validEmail: function(email) {
             var re = /\S+@\S+\.\S+/;
             return re.test(String(email).toLowerCase());
        },
        saveUser: async function() { 
            let app = this;
            this.errors = [];
            await axios.post("http://localhost:9090/users/addUser", {
                "firstname": app.user.firstname,
                "lastname": app.user.lastname,
                "email": app.user.email,
                "password": app.user.password,
                "homeaddress": app.user.homeaddress,
                "uploadedFiles": this.fetchUploadedPics(),
            })
            .then(async resp => {
                if(resp.data.status === "success")
                    this.showModal();
                else {
                    this.errors.push(resp.data.error.message);
                    await this.removeUnusedPictures();
                    this.setUploadedPics([]);
                    this.confirm_password = '';
                    this.uploadSection();
                }
            })
            .catch(error => {
                console.log(error);        
            })
            this.setUploadedPics([]); 
        }
    },
    async created () {
        //Removes unused pictures when window is closed 
        window.addEventListener('beforeunload', async () => {
            await this.removeUnusedPictures(); 
        }, false)
    },
    async beforeRouteLeave(to, from, next) {  
        await this.removeUnusedPictures();
        next()
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

    .bring_back {
        z-index: 0;
    }

    .bring_front {
        z-index: 1;
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