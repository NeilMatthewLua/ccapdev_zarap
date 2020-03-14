<template>
    <div>
        <div id="content" class="container-review hide-on-restaurant hide-on-profile">
            <div class="col s12 m11 l9 view-review">  
                <div class="review-section relative-position">
                    <div class="">
                    <div class="review-feed">
                        <div class="review-post padd-top">
                                <div class="edit-review">
                                    <div v-if="!isEditing">
                                        <ReviewPost :isLiked="false" :isOwn="true" @edit-Review="editReview" @delete-Review="deleteReview" :inProfile="true"/> 
                                    </div>
                                    <div v-else>
                                        <div class="input-field">
                                            <i class="material-icons prefix">mode_edit</i>
                                            <textarea v-model="editData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                                            <div class="file-field input-field">
                                            <div class="red btn">
                                                <span>File</span>
                                                <input type="file" multiple>
                                            </div>
                                            <div class="file-path-wrapper">
                                                <input class="file-path validate" type="text" placeholder="Upload one or more files">
                                            </div>
                                            <a class="submit-btn red btn right push-down">SUBMIT</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewPost from '@/components/display-restaurant/ReviewPost.vue';
export default {
    name: "DiningHistory",
    components: {
        ReviewPost
    },
    data () {
        return {
            isWriting : false, //If user is writing a review
            reviewData : "", //Content to store data in user review
            isEditing: false, //If user is editing current review
            editData: ""
            //Add Computed to get boolean if current user is also review user
        }
    }, 
    methods : {
        editReview (content) { 
            this.isEditing = true;  
            this.$set(this,'editData',content); 
        }, 
        deleteReview() {
            //Deletes Review
        }
    },
}
</script>

<style>
    @import '../../assets/css/view-restaurant/review-section.css';
    @import '../../assets/css/userdetail/userdetail.css';
    .push-down {
        margin-top: 2%;
        margin-bottom: 2%;
    }
</style>