<template>
<div class="review-section">
    <div class="write-review valign-wrapper">
        <div class="user-review-container" v-if="!hasReview">
            <a class="review-btn waves-effect waves-light btn #388e3c green darken-2" v-if="!isWriting" @click="isWriting = true">Write Review</a>
            <div class = "writing-section" v-else>
                <i class="material-icons prefix">mode_edit</i>
                <label for="review-area">Enter review details...</label>
                <textarea v-model="reviewData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                <div class="file-field input-field">
                <div class="red btn">
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
                    <div class="red btn">
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
        <div>
            <ReviewPost :isLiked="false" :isOwn="true" :inProfile="false"/>
            <ReviewPost :isLiked="false" :isOwn="false"  :inProfile="false"/>            
        </div>
    </div>
</div>
</template>

<script scoped>
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
    }
}
</script>

<style scoped>
    .review-section {
        margin-bottom: 40px; 
    }

    .write-review {
        min-height: 50px;  
        max-height: 400px; 
        margin-bottom: 40px; 
        padding: 30px 30px; 
        background-color: var(--default-restaurantcard-color);
        clear: both; 
    }

    .user-review-container {
        width: 100%; 
    }

    #review-area {
        max-height: 200px; 
        overflow-y: scroll; 
    }

    .review-btn {
        z-index: 0 !important; 
    }

    .submit-btn {
        border-radius: 15% !important; 
        margin-right: 20px; 
        z-index: 0 !important; 
    }

    .edit-review {
        width: 100%; 
    }

    .review-title {
        margin-top: 0px; 
    }

    .view-review {
        padding: 1px 20px 20px;  
        background-color: var(--default-restaurantcard-color);
    }

    .view-review-subsection {
        margin-bottom: 30px !important; 
    }
</style>