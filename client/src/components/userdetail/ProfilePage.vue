<template>
    <div>
        <!-- Display info for large -->
        <div class="col s12 m10 l7 squared margin-around hide-on-small relative-position hide-on-edit" v-bind:class="{'editVisible': visible}">
            <div class="profile-container">
            <div class="grouped-info">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">Name:       </pre></div>
                <div class="info-font text menu-font white-text"> {{user.name}}</div>
            </div>
            <div class="grouped-info ">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">Address:    </pre></div>
                <div class="info-font text menu-font white-text"> {{user.address}}</div>
            </div>
            <div class="grouped-info ">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">E-mail:     </pre></div>
                <div class="info-font text menu-font white-text">{{user.email}}</div>
            </div>
            <div class="grouped-info ">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">Points:     </pre></div>
                <div class="info-font text menu-font white-text">{{user.points}}</div>
            </div>
            <div  v-if="isLogged">
                <a href="#" class="white-text hover-underline corner-bottom-right" id="edit-profile" @click="toggleView">Edit Profile</a>
            </div>
            </div>
        </div>
        <div v-bind:class="{'editVisible': editProfileVisible}">
            <!-- Edit Info Large-->
            <div class="col s12 m10 l7 squared margin-around relative-position show-edit-profile-large" v-bind:class="{'editVisible': bigEditProfileVisible}">   
                <div class="profile-container">
                <!-- if wrong details, display error message -->
                <p v-if="errors.length">
                    <b class="errormsg">Please correct the following error(s):</b>
                    <ul>
                        <li class="white-text" v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <div class="row">
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text">First Name:</div>
                    </div>
                    <div class="col s8 offset-s1">
                        <input type="text" class="text white padinput" v-model="user_firstname">
                    </div>
                </div>
                <div class="row"> 
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text">Last Name:</div>
                    </div>
                    <div class="col s8 offset-s1">
                        <input type="text" class="text white padinput" v-model="user_lastname">
                    </div>
                </div>
                <div class="row"> 
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Address:   </pre></div>
                    </div>
                    <div class="col s8 offset-s1">
                    <input type="text" class="text white padinput" v-model="user.address">
                    </div>
                </div>
                <div class="row">
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">E-mail:   </pre></div>
                    </div>
                    <div class="col s8 offset-s1">
                    <input type="text" class="text white padinput" v-model="user.email" readonly>
                    </div>
                </div>
                <div class="row">
                    <div class="col s1">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Password:   </pre></div>
                    </div>
                    <div class="col s8 offset-s2">
                    <input type="text" class="text white padinput" v-model="user.password">
                    </div>
                </div>
                <div class="row">
                    <div class="col s1">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Confirm Password:   </pre></div>
                    </div>
                    <div class="col s8 offset-s2">
                    <input type="text" class="text white padinput" v-model="confirm_password">
                    </div>
                </div>
                 <div class="row">
                    <!-- File Upload Portion -->
                    <FileUpload @file-upload="getFiles" :dest="profilePictures" :isMultiple="false"
                    @toggleSubmit="toggleSubmitButton"/> 
                </div>
                </div>
                <div class="center" v-if="isLogged">
                <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" @click="validateForm">Edit Profile!</a>
                </div>
            </div>
            <!-- Edit Info Small-->
            <div class="col s12 m10 l7 squared margin-around relative-position show-edit-profile-small" v-bind:class="{'editVisible': smallEditProfileVisible}">
                <div class="profile-container">
                <!-- if wrong details, display error message -->
                <p v-if="errors.length">
                    <b class="errormsg">Please correct the following error(s):</b>
                    <ul>
                        <li class="white-text" v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <div class="flex-center">
                    <img class="circle navbar-image" :src= user_picture>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text">First Name:</div>
                    </div>
                    <div class="col s11">
                        <input type="text" class="text white padinput" v-model="user_firstname"></div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text">Last Name:</div>
                    </div>
                    <div class="col s11">
                        <input type="text" class="text white padinput" v-model="user_lastname"></div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Address:   </pre></div>
                    </div>
                    <div class="col s11">
                    <input type="text" class="text white padinput" v-model="user.address" >
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">E-mail:   </pre></div>
                    </div>
                    <div class="col s11">
                    <input type="text" class="text white padinput" v-model="user.email" readonly>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Password:   </pre></div>
                    </div>
                    <div class="col s11">
                    <input type="text" class="text white padinput" v-model="user.password">
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Confirm Password:   </pre></div>
                    </div>
                    <div class="col s11">
                    <input type="text" class="text white padinput" v-model="confirm_password">
                    </div>
                </div>
                 <div class="row">
                    <!-- File Upload Portion -->
                    <FileUpload @file-upload="getFiles" :dest="profilePictures" :isMultiple="false"
                    @toggleSubmit="toggleSubmitButton"/> 
                </div>
                </div>
                <div class="center">
                <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" @click="validateForm">Edit Profile!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FileUpload from '@/components/fileUpload';

export default {
    name: "ProfilePage",
    components: {
        FileUpload
    },
    data() {
        return {
            visible: false,
            editProfileVisible: true,
            bigEditProfileVisible: true,
            smallEditProfileVisible: true,
            user: ' ',
            user_firstname: ' ',
            user_lastname: ' ',
            user_picture: ' ',
            confirm_password: '',
            isLogged: false,
            uploadedFiles: [],
            errors: [],
            tempUser: {
                user: ' ',
                first: ' ',
                last: ' '
            },
            profilePictures: "profilePictures"
        }
    },
    methods: {
       async verifyOwn() {
           this.user = this.$store.getters.getUser;
            if(this.$route.params.id == this.user.userID) {
                this.user_picture = this.$store.getters.getPicture['url'];
                this.isLogged = true;
                this.tempUser.user = Object.assign({}, this.user);
            }
            else(
                this.user = await axios.get(`http://localhost:9090/users/${this.$route.params.id}`)
                .then(resp => {
                    this.user = resp.data.user
                })
            )
            this.user_firstname = this.user.name.split(" ")[0];
            this.user_lastname = this.user.name.split(" ")[1];
            this.tempUser.first = this.user_firstname
            this.tempUser.last = this.user_lastname
        },
        toggleView : function() {
            this.visible = !this.visible;
            this.editProfileVisible = !this.editProfileVisible;
            this.onResize();
        },
        getFiles(files) {
            this.$set(this,'uploadedFiles', files);
        },
        onResize() {
            if(window.innerWidth > 1300) {
                this.bigEditProfileVisible = false;
                this.smallEditProfileVisible = true;
            }
            else {
                this.bigEditProfileVisible = true;
                this.smallEditProfileVisible = false;
            }
        },
        toggleSubmitButton: function(value) {
            this.submitVisible = value
        },
        updateUser() {
            let app = this;
            this.$store
                .dispatch('updateUser', {
                    "firstname": app.user_firstname,
                    "lastname": app.user_lastname,
                    "email": app.user.email,
                    "password": app.user.password,
                    "address": app.user.address,
                    "uploadedFiles": app.user.uploadedFiles,
                    "beenHere": app.user.beenHere,
                    "reviewed": app.user.reviewed,
                    "liked": app.user.liked,
                    "points": app.user.points,
                    "picture": app.user.picture,
                    "uploadedFile": app.uploadedFiles
                    })
                .then(() => )
        },
        validateForm: function () {
            this.errors = [];
            if(!this.user_firstname) {
                this.errors.push('First name required');
            }
            if(!this.user_lastname) {
                this.errors.push('Last name required');
            }
            if(!this.user.password) {
                this.errors.push('Password required');
            }
            else{
                if(!this.confirm_password) {
                    this.errors.push('Confirm Password required');
                }
                else if(this.user.password != this.confirm_password){
                    this.errors.push('Confirm Password does not match Password');
                }
            }
            if(!this.user.address) {
                this.errors.push('Home Address required');
            }
            if(this.uploadedFiles == undefined){
                this.errors.push('Profile Picture required');
            }
            if(!this.errors.length) {
                this.updateUser();
                return true;
            }
            else{
                this.user = Object.assign({}, this.tempUser.user);
                this.user_firstname = this.tempUser.first
                this.user_lastname = this.tempUser.last
                this.confirm_password = '';
            }        
        },
    },
    mounted() {
        this.verifyOwn();
        window.addEventListener('resize', this.onResize)
    }
}
</script>

<style scoped>
    #content {
        min-height: calc(100vh - 80px);
    }

    .squared {
        border : 1px solid var(--default-container-color);
        background-color: var(--default-container-color);
        border-radius: 20px !important;
    }

    .navbar-image {
        height: 150px; 
        width: 150px; 
    }

    .flex-center {
        display:flex;
        justify-content: center;
    }

    .margin-around {
        margin-left: 2% !important;
        margin-right: 2% !important;
    }

    .colored-button {
        background-color: var(--default-button-color) !important;
    }

    .pad-left {
        padding-left: 10%;
        margin-bottom: 50px;
    }

    .big-font {
        font-size: 3vw;
    }

    .menu-font {
        font-size: 35px;
    }

    .padd-top {
        padding-top: 3%;
    }

    .info-font {
        font-size: 18px !important;
    }

    .pad-menu {
        padding-top: 5%;
        padding-left: 5%;
    }

    .profile-container {
        margin-top: 3%;
        margin-left: 2%;
        padding-bottom: 3%;
    }

    .padd-bottom {
        margin-top: 4%;
        margin-bottom: 5%;
    }

    .margin-right {
        margin-right: 10px;
    }

    .grouped-info {
        display: flex;
    }

    .pad-right-text { 
        padding-right: 20px;
    }

    .remove-margin {
        margin: 0;
    }

    .hover-underline:hover {
        text-decoration: underline;
    }

    .relative-position {
        position: relative;
    }

    .corner-bottom-right {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }

    .corner-bottom-right-review {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .padinput {
        padding-left: 10px !important;
        box-sizing: border-box;
        border-radius: 8px !important;
    }

    @media(max-width: 1830px) {
        .menu-font, .info-font {
            font-size: 25px;
        }
    }

    @media(max-width: 1500px) {
        .menu-font, .info-font {
            font-size: 22px;
        }
    }

    @media(max-width: 1350px) {
        .menu-font, .info-font {
            font-size: 18px;
        }
    }

    @media(max-width: 1030px) {
        .menu-font, .info-font {
            font-size: 16px;
        }
    }

    @media(max-width: 900px) {
        .menu-font, .info-font {
            font-size: 18px;
        }
    }
  .editVisible {
      display: none;
  }
</style>