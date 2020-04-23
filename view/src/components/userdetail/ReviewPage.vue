<template>
    <div>
        <div v-show="!loading">
            <div id="content" class="container-review">
                <div class="col s12 m11 l9 view-review">  
                    <div class="review-section relative-position">
                        <div class="write-review">
                            <div class="review-feed" v-show="this.fetchUserReviews().length > 0">
                                <div class="review-post padd-top">
                                    <div class="edit-review">
                                        <div v-show="!isEditing">
                                            <ReviewPost class="review-cells" v-for="(review,index) in this.fetchUserReviews()" :key="review.reviewID"  
                                            :reviewData="review" :index="index" :inFeed="false" @edit-Review="editReview" :inProfile="true"/> 
                                        </div>
                                        <div v-show="isEditing">
                                             <!-- if wrong details, display error message -->
                                            <p v-if="errors.length">
                                                <b class="errormsg">Please correct the following error(s):</b>
                                                <ul>
                                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                                </ul>
                                            </p>
                                            <div class="review-rating">
                                                <p for="review-area1">Rate restaurant</p>
                                                <p id="review-area1">
                                                    <label>
                                                        <input type="checkbox" @change="doThis(1)"
                                                        :checked="isChecked[0]" required/>
                                                        <span></span>
                                                    </label>
                                                    <label>
                                                        <input type="checkbox"
                                                        @change="doThis(2)" :checked="isChecked[1]" />
                                                        <span></span>
                                                    </label>
                                                    <label>
                                                        <input type="checkbox"
                                                        @change="doThis(3)" :checked="isChecked[2]" />
                                                        <span></span>
                                                    </label>
                                                    <label>
                                                        <input type="checkbox"
                                                        @change="doThis(4)" :checked="isChecked[3]" />
                                                        <span></span>
                                                    </label> 
                                                    <label>
                                                        <input type="checkbox"
                                                        @change="doThis(5)" :checked="isChecked[4]" />
                                                        <span></span>
                                                    </label>
                                                </p>
                                            </div>
                                            <div> 
                                                <i class="material-icons prefix">mode_edit</i>
                                                <textarea v-model="editData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                                                <div>
                                                    <!-- File Upload Portion -->
                                                    <ImageUpload ref="uploadSection" @toggleSubmit="this.toggleSubmitButton" 
                                                    :dest="destination" :isBlack="true" :existingPics="this.chosenReviewPics" /> 
                                                    <a class="submit-btn red btn right" @click="validateEdit">SUBMIT</a>
                                                    <a class="submit-btn btn right" @click="cancelEdit">CANCEL</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="this.fetchUserReviews().length == 0">
                                <h5 class="center padd-top"> No Reviews Yet? Review one now!</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <modal @close="hideSuccessModal" :message="modalMessage" v-show="showSuccessModal"/>
            </div>
        </div>
        <loadModal v-show="loading"/>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'; 
import ReviewPost from '@/components/display-restaurant/ReviewPost.vue';
import ImageUpload from '@/components/ImageUpload'; 
import modal from '@/components/alertModal'; 
import loadModal from '@/components/loadModal'; 
import axios from 'axios';  
export default {
    name: "DiningHistory",
    components: {
        ReviewPost,
        loadModal,
        ImageUpload,
        modal 
    },
    data () {
        return {
            isWriting : false, //If user is writing a review
            isEditing: false, //If user is editing current review
            loading : true, //When fetching review posts
            update: false, //To force computed properties to update
            modalMessage: "Review edited successfully!",
            showSuccessModal: false,
            chosenReviewIndex : 0, //Index of review chosen to edit 
            rating: 0,
            editData: "", //Stores the review text of the review being edited 
            destination: "reviewPictures",
            errors: [],
            isCheckedVal: { 
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false
            }, 
        }
    }, 
    computed: {
        //Data of the chosen review to edit 
        chosenReview() {
            return ((this.update && !this.update) || this.fetchUserReviews() != undefined) ? this.fetchUserReviews()[this.chosenReviewIndex] : undefined;  
        },
        chosenReviewPics() {
            return ((this.update && !this.update) || this.chosenReview != undefined) ? this.chosenReview.reviewPics : [];   
        },
        isChecked() {
            return this.isCheckedVal; 
        }
    },
    watch:{
        $route (){
            this.getReviews();
            this.loading = true;
        }
    },
    methods : {
        ...mapActions(['getReviewsByReviewer','getUserReviews','removeUnusedPictures']),
        ...mapGetters(['fetchUserReviews', 'fetchUploadedReviews','fetchUploadedPics']),
        ...mapMutations(['setUploadedPics']),
        //Validates form before saving edit 
        validateEdit() {
            this.errors = [];
            if(!(this.editData != '')) {
                this.errors.push('Review data must be filled!')
            }
            this.rating = 0; 
            for(let i = 4; i >=0; i--){
                if(this.isCheckedVal[i] == true){
                    this.rating = i + 1;
                    break;
                }
            }
            if(this.rating == 0) {
                this.errors.push('Rating is required!')
            }
            if(!this.errors.length) {
                this.saveEdit(); 
                return true;
            }  
        },
        //Save the edit in the db 
        async saveEdit() {
            //Delete existing pictures from reviews
            let newIDs = await axios.post(`/pictures/delete-existing/${this.chosenReview.reviewID}`, {
                    newPictures : this.fetchUploadedPics()
            })
            //Update the restaurants rating in the db 
            await this.$store.dispatch('updateRestoRating', {
                    oldRating : this.chosenReview.rating, 
                    rating : this.rating,
                    restaurantID: this.chosenReview.restaurantID,
                    inProfile : true
            })
            //Edit review in the db 
            .then(async () => 
                await this.$store.dispatch('editReview', {
                    oldReview: this.chosenReview,
                    reviewID: this.chosenReview.reviewID,
                    review : this.editData,
                    rating : this.rating, 
                    photos : newIDs.data,
                    newUrls :  this.fetchUploadedPics(),
                    userID: this.$store.getters.getUser.userID,
                    restaurantID: this.chosenReview.restaurantID,
                    inProfile : true
                })
                //Once all complete, display success modal 
                .then(async () => { 
                    this.displaySuccessModal("Successfully edited review") 
                    })      
                )  
            .catch((err) => {
                            this.displaySuccessModal("Error in updating review.")
                            throw err; 
                            })  
            this.update = false; 
            this.doThis(0); 
        },
        //Sets data inside edit form to chosen review 
        async editReview (index) {
            this.update = true; 
            this.isEditing = true;  
            this.chosenReviewIndex = index; 
            this.editData = this.chosenReview.review;
            this.doThis(this.chosenReview.rating); 
            this.$refs.uploadSection.reset(false, []); 
            this.setUploadedPics(this.chosenReviewPics);   
        }, 
        async cancelEdit() { 
            await this.removeUnusedPictures();
            this.setUploadedPics(this.chosenReviewPics);
            this.update = true; 
            this.doThis(0); 
            this.isEditing = false;   
        },
        displaySuccessModal(message) {
            this.modalMessage = message; 
            this.showSuccessModal = true; 
            this.isEditing = false; 
        },
        hideSuccessModal() {
            this.showSuccessModal = false;
        },
        //Sets the number of checks when editing a review
        doThis(number) {
            for(let i = 0; i < number; i++){
                if(this.isCheckedVal[ number - 1] == true)
                    this.isCheckedVal[i] = !this.isCheckedVal[i];
                else
                    this.isCheckedVal[i] = true;
            }
            for(let i = number; i < 5; i++)
                this.isCheckedVal[i] = false;
        },
        toggleSubmitButton: function(value) {
            this.submitVisible = value
        },
        async getReviews() {
            //Get User Reviews
            await this.getReviewsByReviewer(this.$route.params.id); 
            let arr = this.fetchUserReviews().map((val) => {
                return val.reviewID; 
            }); 

            //Get Review Details of Each
            if(arr.length > 0)
                await this.getUserReviews(arr);
            this.loading = false; 

            //Removes unused pictures when window is closed 
            window.addEventListener('beforeunload', async () => {
                await this.removeUnusedPictures(); 
            }, false)
        }
    },
    mounted() {
        this.$refs.uploadSection.reset(true, this.chosenReviewPics);  
    },
    async created () {
        //Get User Reviews
        await this.getReviewsByReviewer(this.$route.params.id); 
        let arr = this.fetchUserReviews().map((val) => {
            return val.reviewID; 
        }); 

        //Get Review Details of Each
        if(arr.length > 0)
            await this.getUserReviews(arr);
        this.loading = false; 

        //Removes unused pictures when window is closed 
        window.addEventListener('beforeunload', async () => {
            await this.removeUnusedPictures(); 
        }, false)
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

    .review-cells {
        padding: 10px; 
        border-bottom: 1px solid #eeeeee;
    }

    .review-section {
        margin-bottom: 40px; 
    }

    .write-review {
        min-height: 50px;   
        margin-bottom: 40px; 
        padding: 0px 30px; 
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
        margin-top: 20px; 
        margin-right: 20px; 
        margin-bottom: 20px; 
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