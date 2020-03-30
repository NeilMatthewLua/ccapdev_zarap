<template>
    <div>
        <div v-if="!loading">
            <div id="content" class="container-review">
                <div class="col s12 m11 l9 view-review">  
                    <div class="review-section relative-position">
                        <div class="write-review">
                            <div class="review-feed">
                                <div class="review-post padd-top">
                                    <div class="edit-review">
                                        <div v-if="!isEditing">
                                            <ReviewPost v-for="review in this.fetchUserReviews()" :key="review.reviewID"  
                                            :reviewData="review" :inFeed="false" @edit-Review="editReview" @delete-Review="deleteReview" :inProfile="true"/> 
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
        <div v-if="loading" class="loading">
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="150"
          color="#CB202D"
            />
        </div>
    </div>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners';
import { mapActions, mapGetters } from 'vuex'; 
import ReviewPost from '@/components/display-restaurant/ReviewPost.vue';
export default {
    name: "DiningHistory",
    components: {
        ReviewPost,
        BreedingRhombusSpinner
    },
    data () {
        return {
            isWriting : false, //If user is writing a review
            reviewData : "", //Content to store data in user review
            isEditing: false, //If user is editing current review
            editData: "",
            loading : true 
            //Add Computed to get boolean if current user is also review user
        }
    }, 
    methods : {
        ...mapActions(['getReviewsByReviewer','getUserReviews']),
        ...mapGetters(['fetchUserReviews']),
        editReview (content) { 
            this.isEditing = true;  
            this.$set(this,'editData',content); 
        }, 
        deleteReview() {
            //Deletes Review
        }
    },
    async created () {
        //Get User Reviews
        await this.getReviewsByReviewer(this.$route.params.id); 
        let arr = this.fetchUserReviews().map((val) => {
            return val.reviewID; 
        }); 
        //Get Review Details of Each
        await this.getUserReviews(arr);
        this.loading = false; 
    }
}
</script>

<style>
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .review-section {
        margin-bottom: 40px; 
    }

    .write-review {
        min-height: 50px;  
        max-height: 400px; 
        margin-bottom: 40px; 
        padding: 30px 30px; 
        background-color: var(--default-reviewcard-color);
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
        background-color: var(--default-reviewcard-color);
    }

    .view-review-subsection {
        margin-bottom: 30px !important; 
    }

    #content {
        min-height: calc(100vh - 80px);
    }

    .square {
        border : 1px solid var(--default-reviewcard-color);
        background-color: var(--default-reviewcard-color);
        border-radius: 20px !important;
    }

    .margin-around {
        margin-left: 2% !important;
        margin-right: 2% !important;
    }

    .colored-button {
        background-color: var(--default-reviewcard-color) !important;
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

    @media(max-width: 1500px) {
        .margin-right {
            margin-right: 5% !important;
        }
    }

    .push-down {
        margin-top: 2%;
        margin-bottom: 2%;
    }
</style>