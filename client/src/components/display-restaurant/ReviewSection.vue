<template>
<div class="review-section">
    <div class="write-review valign-wrapper" v-if="isLogged">
        <!-- TODO Check if User is Logged -->
        <div class="user-review-container" v-if="!hasReview">
            <a class="review-btn waves-effect waves-light btn #388e3c green darken-2" v-if="!isWriting" @click="isWriting = true">Write Review</a>
            <div class = "writing-section" v-else>
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
                <div class="file-field input-field">
                <!-- File Upload Portion -->
                <FileUpload @file-upload="getFiles" :isMultiple="true" :dest="destination"/> 
                <a class="submit-btn red btn right" @click="validateReview">SUBMIT</a>
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
                    <!-- File Upload Portion -->
                    <FileUpload @file-upload="getFiles" :isMultiple="true" :dest="destination" @toggleSubmit="toggleSubmitButton"/> 
                    <a class="submit-btn red btn right"  v-if='submitVisible'>SUBMIT</a>
                    </div>
                </div>
            </div>
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
                <ReviewPost :inProfile="false" :reviewData="this.popularReview"/> 
            </div>
            <div v-if="!showPopular">
                <ReviewPost v-for="review in this.allReviews" :key="review.reviewID"
                  :inProfile="false" :reviewData="review"/>
            </div>           
        </div>
    </div>
</div>
</template>

<script scoped>
import { mapGetters } from 'vuex'; 
import ReviewPost from './ReviewPost'; 
import FileUpload from '@/components/fileUpload';
// import {mapGetters, mapActions} from 'vuex'; 

export default {
    name: "ReviewSection",
    components: {
        ReviewPost,
        FileUpload
    }, 
    props: {
        hasReview: Boolean //If the user has written a review for said restaurant
    },
    data () {
        return {
            checked: false,
            isWriting : false, //If user is writing a review
            reviewData : "", //Content to store data in user review
            isEditing: false, //If user is editing current review
            editData: "",
            destination: "reviews",
            //Add Computed to get boolean if current user is also review user
            uploadedFiles: [],
            errors: [],
            showPopular : true,
            submitVisible: true,
            rating: 0,
            isCheckedVal: {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false
            }
        }   
    },
    computed : {
        allReviews () {
            return this.fetchAllReviews();
        },
        popularReview () {
            return this.fetchPopularReview(); 
        },
        isLogged () {
            return (this.$store.getters.getUser != undefined) ? true : false; 
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
        toggleSubmitButton: function(value) {
            this.submitVisible = value
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
            if(!this.errors.length) {
                this.saveReview();
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
            .then(() => { //Adds the restuarant to the user's visited places
                this.$emit('postedReview')
            })
            .catch(() => console.log("DAMn"))
        },
       editReview (content) { 
        this.isEditing = true;  
        this.$set(this,'editData',content); 
        //Add in edit data for the server
      }, 
      deleteReview () {
        // this.$store.dispatch('deleteReview')
      },
      getFiles (files) {
        this.$set(this,'uploadedFiles', files); 
      },
      switchPopular() {
        console.log(this.allReviews)
        this.showPopular = true 
      },
      switchAll() { 
        this.showPopular = false
      },
      ...mapGetters(['fetchAllReviews', 'fetchPopularReview'])
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
        border-radius: 15% !important; 
        margin-right: 20px; 
        z-index: 0 !important; 
    }

    .edit-review {
        width: 100%; 
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