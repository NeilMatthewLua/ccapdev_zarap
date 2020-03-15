<template>
    <div>
        <!-- Display info for large -->
        <div class="col s12 m10 l7 squared margin-around hide-on-small relative-position hide-on-edit" v-bind:class="{'editVisible': visible}">
            <div class="profile-container">
            <div class="grouped-info">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">Name:       </pre></div>
                <div class="info-font text menu-font white-text"> {{name}}</div>
            </div>
            <div class="grouped-info ">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">Address:    </pre></div>
                <div class="info-font text menu-font white-text"> {{address}}</div>
            </div>
            <div class="grouped-info ">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">E-mail:     </pre></div>
                <div class="info-font text menu-font white-text">{{email}}</div>
            </div>
            <div class="grouped-info ">
                <div class="info-font white-text pad-right-text"><pre class="remove-margin">Points:     </pre></div>
                <div class="info-font text menu-font white-text">{{points}}</div>
            </div>
            <div  v-if="isOwn">
                <a href="#" class="white-text hover-underline corner-bottom-right" id="edit-profile" @click="toggleView">Edit Profile</a>
            </div>
            </div>
        </div>
        <div v-bind:class="{'editVisible': editProfileVisible}">
            <!-- Edit Info Large-->
            <div class="col s12 m10 l7 squared margin-around relative-position show-edit-profile-large" v-bind:class="{'editVisible': bigEditProfileVisible}">   
                <div class="profile-container">
                <div class="row">
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text">Name:</div>
                    </div>
                    <div class="col s8 offset-s1">
                        <input type="text" class="text white padinput">
                    </div>
                </div>
                <div class="row">
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Address:   </pre></div>
                    </div>
                    <div class="col s8 offset-s1">
                    <input type="text" class="text white padinput">
                    </div>
                </div>
                <div class="row">
                    <div class="col s2">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">E-mail:   </pre></div>
                    </div>
                    <div class="col s8 offset-s1">
                    <input type="text" class="text white padinput" value="raprapzarap@gmail.com" readonly>
                    </div>
                </div>
                <div class="row">
                    <div class="col s1">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Password:   </pre></div>
                    </div>
                    <div class="col s8 offset-s2">
                    <input type="text" class="text white padinput">
                    </div>
                </div>
                <div class="row">
                    <div class="col s1">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Confirm Password:   </pre></div>
                    </div>
                    <div class="col s8 offset-s2">
                    <input type="text" class="text white padinput">
                    </div>
                </div>
                </div>
                <div class="center" v-if="isOwn">
                <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" href="userdetail.html">Edit Profile!</a>
                </div>
            </div>
            <!-- Edit Info Small-->
            <div class="col s12 m10 l7 squared margin-around relative-position show-edit-profile-small" v-bind:class="{'editVisible': smallEditProfileVisible}">
                <div class="profile-container">
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text">Name:</div>
                    </div>
                    <div class="col s10">
                        <input type="text" class="text white padinput">
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Address:   </pre></div>
                    </div>
                    <div class="col s10">
                    <input type="text" class="text white padinput">
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">E-mail:   </pre></div>
                    </div>
                    <div class="col s10">
                    <input type="text" class="text white padinput" value="raprapzarap@gmail.com" readonly>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Password:   </pre></div>
                    </div>
                    <div class="col s10">
                    <input type="text" class="text white padinput">
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                    <div class="info-font white-text pad-right-text"><pre class="remove-margin">Confirm Password:   </pre></div>
                    </div>
                    <div class="col s10">
                    <input type="text" class="text white padinput">
                    </div>
                </div>
                </div>
                <div class="center">
                <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" href="userdetail.html">Edit Profile!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfilePage",
    data() {
        return {
            visible : false,
            editProfileVisible : true,
            bigEditProfileVisible : true,
            smallEditProfileVisible : false,
            isOwn : false, 
            name : "Richard Alvin Zapanta",
            address : "29A Princeview Parksuites",
            email : "zapzapzap@gmail.com",
            points : "32"
        }
    },
    methods: {
        toggleView : function() {
            this.visible = !this.visible;
            this.editProfileVisible = !this.editProfileVisible;
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
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
    }
}
</script>

<style scoped>
    body {
        background-color: #F4F4F2;
    }

    #content {
        min-height: calc(100vh - 80px);
    }

    :root {
        --default-button-color: #CB202D;
        --default-navbar-color: #CB202D;
        --default-container-color: #2D2D2D;
    }

    .squared {
        border : 1px solid var(--default-container-color);
        background-color: #2D2D2D;
        border-radius: 20px !important;
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