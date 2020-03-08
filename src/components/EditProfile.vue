<template>
    <div>
        <!-- Edit Info Large-->
        <div class="col s12 m10 l7 square margin-around relative-position show-edit-profile-large">
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
            <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" href="userdetail.html">Edit Profile!</a>
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
            <a class="waves-effect waves-light btn-large colored-button show-on-edit padd-bottom" href="userdetail.html">Edit Profile!</a>
            </div>
        </div>
    </div>    
</template>

<script>
import M from 'materialize-css';
export default {
    name: "EditProfile",
    mounted() {
        M.AutoInit(); 
    }
}
</script>

<style>
    @import '../assets/css/userdetail.css'; 
</style>