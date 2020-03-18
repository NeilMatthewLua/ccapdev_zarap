<template>
    <div>
        <!-- Edit Info Large-->
        <div class="col s12 m10 l7 square margin-around relative-position">
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
            <div class="center">
            <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" href="/userdetail/profile">Edit Profile!</a>
            </div>
        </div>
        <!-- Edit Info Small-->
        <div class="col s12 m10 l7 square margin-around relative-position show-edit-profile-small">
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
            <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" href="/userdetail/profile">Edit Profile!</a>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name: "EditProfile"
}
</script>

<style scoped>
    #content {
        min-height: calc(100vh - 80px);
    }
    
    .square {
        border : 1px solid var(--default-container-color);
        background-color: var(--default-container-color);
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
</style>