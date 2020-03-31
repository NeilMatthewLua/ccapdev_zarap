<template>
<div class="review-section">
    <div class="write-review valign-wrapper" v-show="isLogged">
        <div class="user-review-container" v-show="!this.hasReview">
            <a class="review-btn waves-effect waves-light btn #388e3c green darken-2" v-show="!isWriting" @click="writeReview">Write Review</a>
            <div class = "writing-section" v-show="isWriting">
                <!-- if wrong details, display error message -->
                <p v-if="errors.length">
                    <b class="errormsg">Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
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
                <i class="material-icons prefix">mode_edit</i>
                <label for="review-area">Enter review details</label>
                <textarea v-model="reviewData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                <div class="input-field">
                <!-- File Upload Portion -->
                    <ImageUpload ref="uploadSection" @file-upload="getFiles"  @toggleSubmit="this.toggleSubmitButton" 
                    :dest="destination"  :existingPics="this.reviewPictures" /> 
                    <a class="submit-btn red btn right" @click="validateReview">SUBMIT</a>
                    <a class="submit-btn btn right" @click="cancelWrite">CANCEL</a>
                </div>
            </div>
        </div>
        <modal @close="hideSuccessModal" :message="message" v-show="showSuccessModal"/> 
        <div class="edit-review" v-show="this.hasReview">
            <div v-show="!isEditing">
                <h3 class="review-title">My Review</h3>
                <ReviewPost :inProfile="false" :reviewData="this.ownReview" :inFeed="false" @edit-Review="editReview" @delete-Review="deleteReview"/> 
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
                <div class="input-field"> 
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea v-model="editData" id="review-area" class="materialize-textarea" data-length = "300"></textarea>
                    <div>
                    <!-- File Upload Portion -->
                    <ImageUpload ref="uploadSection" @file-upload="getFiles"  @toggleSubmit="this.toggleSubmitButton" 
                    :dest="destination"  :existingPics="this.reviewPictures" /> 
                    <a class="submit-btn red btn right" @click="validateEdit">SUBMIT</a>
                    <a class="submit-btn btn right" @click="cancelEdit">CANCEL</a>
                    </div>
                </div>
            </div>
            <modal @close="hideSuccessModal" :message="modalMessage" v-show="showSuccessModal"/> 
        </div>
    </div>
    <div class="view-review">
        <h3><strong>Reviews</strong></h3>
        <div class="view-review-subsection row">
            <a class="col s3 center" :class="{ selected: showPopular }" @click="switchPopular()">Popular</a>
            <a class="col s3 center" :class="{ selected: !showPopular }" @click="switchAll()">All Reviews</a>
        </div>
        <div class="reviewFeed">
            <div v-if="showPopular">
                <ReviewPost :inProfile="false" :inFeed="true" :reviewData="this.popularReview"/> 
            </div>
            <div v-if="!showPopular">
                <ReviewPost v-for="review in this.allReviews" :key="review.reviewID"
                  :inProfile="false" :inFeed="true" :reviewData="review"/>
            </div>           
        </div>
    </div>
</div>
</template>

<script scoped>
import { mapGetters } from 'vuex'; 
import ReviewPost from './ReviewPost'; 
import ImageUpload from '@/components/ImageUpload'; 
import modal from '@/components/alertModal'; 

export default {
    name: "ReviewSection",
    components: {
        ReviewPost,
        ImageUpload, 
        modal 
    }, 
    data () {
        return {
            checked: false,
            isWriting : false, //If user is writing a review
            reviewData : "", //Content to store data in user review
            isEditing: false, //If user is editing current review
            editData: "",
            destination: "reviewPictures",
            //Add Computed to get boolean if current user is also review user
            uploadedFiles: [],
            errors: [],
            showPopular : true,
            submitVisible: true,
            update: false,  
            rating: 0,
            isCheckedVal: {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false
            }, 
            modalMessage: "Review edited successfully!",
            message: "Review added!",
            showSuccessModal: false
        }   
    }, 
    computed : {
        allReviews () {
            return (this.update || !this.showPopular) ? this.fetchAllReviews() : []; 
        },
        popularReview () {
            return (this.update || this.showPopular) ? this.fetchPopularReview() : []; 
        },
        isLogged () {
            return (this.getUser() != undefined) ? true : false; 
        }, 
        hasReview() { 
            return (this.isLogged) ? this.$store.getters.hasReview(this.getUser().userID) : false; 
        },
        ownReview() {
            return (this.update || this.isLogged) ? this.$store.getters.ownReview(this.getUser().userID) : undefined;  
        },
        reviewPictures() {
            return (this.hasReview) ? this.ownReview.reviewPics : []; 
        },
        isChecked() {
            return this.isCheckedVal
        }
    },
    methods: {
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
        resetReview() {
            this.review = "",
            this.isCheckedVal = {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false
            },
            this.isWriting = false
        },
        toggleSubmitButton: function(value) {
            this.submitVisible = value
        },
        writeReview() {
            this.isWriting = true; 
            this.doThis(0); 
            this.$set(this,'uploadedFiles',[]); 
        },
        validateReview() {
            this.errors = [];
            if(!(this.reviewData != '')) {
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
            if(this.uploadedFiles.length > 5) {
                this.errors.push('Only up to 5 images can be uploaded!')
            }
            if(!this.errors.length) {
                this.saveReview(); 
                return true;
            }  
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
        saveReview() { //saves and posts the review of the user
            this.$store.dispatch('addReview', {
                review: this.reviewData,
                rating: this.rating,
                photos: this.uploadedFiles,
                userID: this.$store.getters.getUser,
                restaurant: this.$store.getters.fetchCurrResto
            })
            .then(async () => { //Adds the restuarant to the user's visited places
                await this.$store.dispatch('updateGetUser')
                await this.$store.dispatch('getRestoById',this.$store.getters.fetchCurrResto.restaurantID)
                .then(() => {
                      this.displaySuccessModal("Successfully added review")
                      this.resetReview()
                      })      
                this.$emit('postedReview',true)
            }) 
            .catch((err) => {console.log(err)
                          this.displaySuccessModal("Error in updating review.")
                            }) 
            
            this.update = true;
        },
      editReview () { 
        this.isEditing = true;  
        this.doThis(this.ownReview.rating); 
        this.$set(this,'uploadedFiles', this.ownReview.reviewPics); 
      }, 
      async saveEdit() {
          await this.$store.dispatch('updateRestoRating', {
                    oldRating : this.ownReview.rating, 
                    rating : this.rating,
                    restaurantID: this.$store.getters.fetchCurrResto.restaurantID,
                    inProfile: false
          })
          .then(async () => 
                await this.$store.dispatch('editReview', {
                    oldReview: this.ownReview,
                    reviewID: this.ownReview.reviewID,
                    review : this.editData,
                    rating : this.rating, 
                    photos: this.uploadedFiles,
                    userID: this.$store.getters.getUser.userID,
                    restaurantID: this.$store.getters.fetchCurrResto.restaurantID,
                    inProfile: false
                })
                .then(() => this.displaySuccessModal("Successfully edited review"))      
                )  
          .catch((err) => {console.log(err)
                          this.displaySuccessModal("Error in updating review.")
                            })  
        this.update = true; 
        console.log(this.ownReview);  
      },
      cancelWrite() {
        this.isWriting = false; 
        this.$set(this,'uploadedFiles', []);
        this.update = false;
        this.rating = 0;
        this.reviewData = "";
        this.editData = "";  
      },
      cancelEdit() {
          this.isEditing = false; 
      },
      deleteReview () {
        this.cancelWrite(); 
        this.$emit('postedReview', false)
      },
      getFiles (files) {
        this.$set(this,'uploadedFiles', files); 
      },
      switchPopular() {
        this.showPopular = true 
      },
      switchAll() { 
        this.showPopular = false
      },
      displaySuccessModal(message) {
        this.modalMessage = message;   
        this.showSuccessModal = true; 
        this.isEditing = false; 
        this.update = false; 
      },
      hideSuccessModal() {
        this.showSuccessModal = false;
      },
      ...mapGetters(['fetchAllReviews', 'fetchPopularReview','getUser'])
    },
    mounted() {
         this.$refs.uploadSection.reset(true, this.reviewPictures);  
    },
    created() {
        if(this.hasReview) {
            this.editData = this.ownReview.review; 
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
        max-height: 800px; 
        margin-bottom: 40px; 
        padding: 30px 30px; 
        background-color: var(--default-restaurantcard-color);
        clear: both; 
    }

    .user-review-container {
        width: 100%; 
    }

    #review-area {
        min-height: 100px; 
        max-height: 200px; 
        overflow-y: scroll; 
    }

    .review-btn {
        z-index: 0 !important; 
    }

    .submit-btn {
        margin-top: 20px; 
        border-radius: 15% !important; 
        margin-right: 20px; 
        z-index: 0 !important; 
    }

    .edit-review {
        width: 100%; 
    }

    .review-rating {
        display: block; 
    }

    .selected {
        background-color: rgb(169, 229, 255, 0.4); 
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

    .view-review-subsection > a {
        transition: color 0.2s ease-in-out;
    }

    .view-review-subsection > a:hover {
        color: red; 
    }
</style>