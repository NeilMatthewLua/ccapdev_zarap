<template>
    <div>
        <div v-show="!loading">
            <div id="content" class="container-review">
                <div class="col s12 m11 l9 view-review">  
                    <div class="review-section relative-position">
                        <div class="write-review">
                            <div class="review-feed" v-if="this.fetchUserReviews().length > 0">
                                <div class="review-post padd-top">
                                    <div class="edit-review">
                                        <div v-show="!isEditing">
                                            <ReviewPost class="review-cells" v-for="(review,index) in this.fetchUserReviews()" :key="review.reviewID"  
                                            :reviewData="review" :index="index" :inFeed="false" @edit-Review="editReview" @delete-Review="deleteReview" :inProfile="true"/> 
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
                                                    <ImageUpload ref="uploadSection" @file-upload="getFiles"  @toggleSubmit="this.toggleSubmitButton" 
                                                    :dest="destination"  :existingPics="this.chosenReviewPics" /> 
                                                    <a class="submit-btn red btn right" @click="validateEdit">SUBMIT</a>
                                                    <a class="submit-btn btn right" @click="cancelEdit">CANCEL</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <h5 class="center padd-top"> No Reviews Yet? Review one now!</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <modal @close="hideSuccessModal" :message="modalMessage" v-show="showSuccessModal"/>
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
import ImageUpload from '@/components/ImageUpload'; 
import modal from '@/components/alertModal'; 
export default {
    name: "DiningHistory",
    components: {
        ReviewPost,
        BreedingRhombusSpinner,
        ImageUpload,
        modal 
    },
    data () {
        return {
            isWriting : false, //If user is writing a review
            reviewData : "", //Content to store data in user review
            isEditing: false, //If user is editing current review
            loading : true,
            chosenReviewIndex : 0, 
            rating: 0,
            editData: "",
            destination: "reviewPictures",
            update: false, 
            uploadedFiles: [],
            errors: [],
            isCheckedVal: {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false
            }, 
            modalMessage: "Review edited successfully!",
            showSuccessModal: false
        }
    }, 
    computed: {
        chosenReview() {
            return (this.update || this.fetchUserReviews() != undefined) ? this.fetchUserReviews()[this.chosenReviewIndex] : undefined;  
        },
        chosenReviewPics() {
            return (this.update || this.chosenReview != undefined) ? this.chosenReview.reviewPics : [];   
        },
        isChecked() {
            return this.isCheckedVal; 
        }
    },
    methods : {
        ...mapActions(['getReviewsByReviewer','getUserReviews']),
        ...mapGetters(['fetchUserReviews']),
        async editReview (index) {
            this.update = true; 
            this.isEditing = true;  
            this.chosenReviewIndex = index; 
            this.editData = this.chosenReview.review;
            this.doThis(this.chosenReview.rating); 
            this.$set(this,'uploadedFiles', this.chosenReviewPics); 
            console.log(this.chosenReviewPics); 
            this.$refs.uploadSection.reset(true, this.chosenReviewPics); 
        }, 
        deleteReview() {
            //Deletes Review
        },
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
        validateEdit() {
            this.errors = [];
            if(!(this.editData != '')) {
                this.errors.push('Review data must be filled!')
            }
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
      async saveEdit() {
          await this.$store.dispatch('updateRestoRating', {
                    oldRating : this.chosenReview.rating, 
                    rating : this.rating,
                    restaurantID: this.chosenReview.restaurantID,
                    inProfile : true
          })
          .then(async () => 
                await this.$store.dispatch('editReview', {
                    oldReview: this.chosenReview,
                    reviewID: this.chosenReview.reviewID,
                    review : this.editData,
                    rating : this.rating, 
                    photos: this.uploadedFiles,
                    userID: this.$store.getters.getUser.userID,
                    restaurantID: this.chosenReview.restaurantID,
                    inProfile : true
                })
                .then(() => this.displaySuccessModal("Successfully edited review"))      
                )  
          .catch((err) => {console.log(err)
                          this.displaySuccessModal("Error in updating review.")
                            })  
        this.update = false; 
        this.doThis(0); 
      },
      cancelEdit() {
          this.doThis(0); 
          this.isEditing = false; 
          this.update = false;  
      },
      getFiles (files) {
        this.$set(this,'uploadedFiles', files); 
      },
      displaySuccessModal(message) {
        this.modalMessage = message; 
        this.showSuccessModal = true; 
        this.isEditing = false; 
      },
      hideSuccessModal() {
        this.showSuccessModal = false;
      },
      mounted() {
         this.$refs.uploadSection.reset(true, this.chosenReviewPics);  
      },
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