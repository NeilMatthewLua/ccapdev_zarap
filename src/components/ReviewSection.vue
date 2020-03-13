<template>
<div class="review-section">
    <div class="write-review valign-wrapper">
        <div v-if="!hasReview">
            <a class="review-btn waves-effect waves-light btn #388e3c green darken-2" v-if="!isWriting" @click="isWriting = true">Write Review</a>
            <div class = "input-field" v-else>
                <i class="material-icons prefix">mode_edit</i>
                <textarea v-model="reviewData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                <label for="review-area">Enter review details...</label>
                <div class="file-field input-field">
                <div class="btn">
                    <span>File</span>
                    <input type="file" multiple>
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Upload one or more files">
                </div>
                <a class="submit-btn red btn right">SUBMIT</a>
                </div>
            </div>
        </div>
        <div class="edit-review" v-else>
            <div v-if="!isEditing">
                <h3 class="review-title">My Review</h3>
                <ReviewPost :isLiked="false" :isOwn="true" @edit-Review="editReview" @delete-Review="deleteReview"/> 
            </div>
            <div v-else>
                <div class="input-field">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea v-model="editData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                    <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" multiple>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files">
                    </div>
                    <a class="submit-btn red btn right">SUBMIT</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="view-review">
        <h3><strong>Reviews</strong></h3>
        <div class="view-review-subsection row">
            <a class="col s3 center" href="#">Popular</a>
            <a class="col s3 center" href="#">All Reviews</a>
        </div>
        <div class="review-feed">
            <ReviewPost :isLiked="false" :isOwn="false"/>
            <ReviewPost :isLiked="false" :isOwn="false"/>            
        </div>
    </div>
</div>
</template>

<script scoped>
import M from 'materialize-css'; 
import ReviewPost from './ReviewPost'; 
export default {
    name: "ReviewSection",
    components: {
        ReviewPost
    }, 
    props: {
        hasReview: Boolean //If the user has written a review for said restaurant
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
    mounted() {
        M.AutoInit();
    }
}
</script>

<style scoped>
@import '../assets/css/view-restaurant-review.css';
</style>