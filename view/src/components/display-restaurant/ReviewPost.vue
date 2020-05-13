<template>
  <div class="review-post" v-if="this.hasReview">
      <div class="row valign-wrapper">
        <!-- Content if Review is in Restaurant Page -->
        <div class="valign-wrapper col s10"  v-if="!inProfile">
            <img class="post-author-pic" :src="this.reviewData.userUrl">
            <!-- Change Route to user profile -->
            <a @click="goToProfile()"><h4 class="post-author">{{this.reviewData.name}}</h4></a>
            <h5 class="post-rating #388e3c green white-text darken-2">{{this.reviewData.rating}}</h5>
        </div>
        <!-- Content if Review is in Profile -->
        <div class="valign-wrapper col s11"  v-else>
            <img class="post-author-pic" :src="this.reviewData.restoUrl">
            <h4 class="post-author"><a @click="goToRestaurant()"><strong>{{this.reviewData.name}}</strong></a></h4>
            <h5 class="post-rating #388e3c green white-text darken-2">{{this.reviewData.rating}}</h5>
        </div>
        <!-- Like and Upvotes of Review  -->
        <div class="col s2 valign-wrapper">
            <i class="material-icons">arrow_upward</i>
            <h5 class="green-text upvotes">{{this.reviewData.upvotes}}</h5>
            <i v-bind:class="{'liked' : this.isLiked}" 
            @click="toggleLike()"
            class="material-icons right-align pointer" v-if="!this.isOwn && this.isLogged">thumb_up</i> 
        </div>
        <!-- Edit and Delete Review Buttons if own Review -->
        <div class="col s2 valign-wrapper margin-right" v-if="this.isOwn && !inFeed">
            <a class="submit-btn green btn pointer" @click="editReview()"><i class="material-icons review-icons">edit</i></a>
            <a class="submit-btn red btn pointer" @click="showConfirmModal()"><i class="material-icons review-icons">delete</i></a>
        </div>
        <confirmModal                
            :message= "message" 
            v-show="isModalVisible"
            @close="isConfirmed"
            class="bring_front"
        />
      </div>
    <p ref="data">{{this.reviewData.review}}</p>
    <div class="pictures-container">
        <div class="picture-container" v-for="(picture,index) in this.reviewPics" :key="index" @click="showModal">
            <img class="picture" :index="index" :src="picture" alt="">
            <div class="zoom-in" :index="index" ><i class="material-icons" :index="index">zoom_in</i></div>
        </div>
    </div>
    <PictureModal :url="this.reviewPics[zoomedPic]" 
                    @close="closeModal()" @change-pic="this.changePic"
                    v-if="modalVisible"/>
 </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'; 
import PictureModal from '@/components/PictureModal'; 
import confirmModal from '@/components/confirmModal'; 
import router from '@/router';
import axios from 'axios'; 

export default {
    name: "ReviewPost",
    components: {
      PictureModal,
      confirmModal  
    },
    data: () => {
        return {
            zoomedPic : 0,
            modalVisible : false,
            isModalVisible : false,
            message: "Are you sure you want to delete your review? (Your points will be adjusted accordingly)"
        }
    },
    props: {
        inProfile: Boolean, //If the review is viewed inside the profile page
        reviewData : Object, //Review object passed
        inFeed : Boolean,
        index : Number
    },
    computed : {
        //Checks if review is own review 
        isOwn() {
            if(this.getUser() != null)
                return this.getUser().userID === this.reviewData.reviewerID; 
            else
                return false; 
        },
        //Checks if a user is logged in 
        isLogged() {
            return (this.getUser() != null) ? true : false; 
        },
        //Checks if post is liked by user 
        isLiked() {
            return this.isLogged ? ((this.getUser().liked.includes(this.reviewData.reviewID)) ? true : false) : false; 
        }, 
        reviewPics() {
            return this.reviewData.reviewPics; 
        },
        hasReview() {
            return (this.reviewData != undefined) ? true : false; 
        }
    },
    methods: {
        ...mapGetters(['getUser','isLoggedIn', 'isLikedReview']),
        ...mapMutations(['setLikedReview', 'removeLikedReview','addLikes']),
        async toggleLike() {  
            //Add or remove review from user state
            //Add or remove review from db and update related entries (user liked reviews, review upvotes, review author points)
            if(this.isLiked) {
                this.removeLikedReview(this.reviewData.reviewID); 
                this.reviewData.upvotes -= 1; 
                await this.updatePostLikes(-1); 
            }
            else {
                this.setLikedReview(this.reviewData.reviewID); 
                this.reviewData.upvotes += 1; 
                await this.updatePostLikes(1); 
            }
            this.addLikes(this.reviewData)
        }, 
        async updatePostLikes(value) {
            let userID = this.getUser().userID; 
            let reviewID = this.reviewData.reviewID; 
            let ownerID = this.reviewData.reviewerID; 
            if(value > 0)
                await axios.post(`/users/addLiked/${userID}`, {reviewID}); 
            else    
                await axios.post(`/users/deleteLiked/${userID}`, {reviewID});
            await axios.post(`/reviews/increment/${reviewID}`, {value});
            await axios.post(`/users/increment/${ownerID}`, {value});
        },
        editReview() {
            if(this.inProfile)
                this.$emit('edit-Review', this.index);
            else 
                this.$emit('edit-Review');
        }, 
        deleteReview() {
            this.$store.dispatch('deleteReview', {
                restaurant: this.reviewData,
                user: this.$store.getters.getUser,
                route: this.$route
            })
            .then(async () =>{
                await this.$store.dispatch('updateGetUser'),
                await this.$store.dispatch('getRestoById',this.$store.getters.fetchCurrResto.restaurantID)
            }) 
        }, 
        goToProfile() {
            if((this.$store.getters.getUser != null) && JSON.stringify(this.reviewData.userID) == JSON.stringify(this.$store.getters.getUser.userID)) 
                router.push({ name: 'UserDetail', params: { id : this.reviewData.reviewerID, menu : "myprofile" } });
            else
                router.push({ name: 'UserDetail', params: { id : this.reviewData.reviewerID, menu : "profile" } });
            
        }, 
        goToRestaurant() {
            router.push({ name: 'Display Restaurant', params: { id : this.reviewData.restaurantID } });
        },
        showModal(e) {
            this.modalVisible = true; 
            this.zoomedPic = e.target.getAttribute('index'); 
        },
        closeModal() {
            this.modalVisible = false; 
        },
        changePic(direction) {
            this.zoomedPic = ((parseInt(this.zoomedPic) + parseInt(direction)) % this.reviewPics.length 
            + parseInt(this.reviewPics.length)) % this.reviewPics.length; 
        },
        isConfirmed(value) { //confirmation of deleting a review
            if(value == true)
                this.deleteReview();
            this.closeConfirmModal();
        },
        showConfirmModal() { 
            this.isModalVisible = true;
        },
        closeConfirmModal() {
            this.isModalVisible = false;
        }
    }
}
</script>

<style scoped>
    .liked {
        color: var(--default-liked-color); 
    }

    .pointer {
        cursor: pointer; 
        transition: all 0.3s ease-in-out;
    }

    .pointer:hover {
        transform: scale(1.2);
    }

    .upvotes {
        margin-right: 5px; 
    }

    .post-author {
        transition: color 0.4s ease-in-out; 
    }

    .post-author:hover {
        color: red !important;
    }

    .post-author-pic { 
        display: inline-block; 
        margin-right: 20px; 
        height: 50px; 
        width: 50px; 
        border-radius: 50%; 
    }

    .post-rating {
        margin-left: 20px; 
        padding: 8px; 
    }

    .review-post {
        background-color: var(--default-retaurantcard-color);
    }

    .review-post > .post-header > h4 {
        display: inline-block; 
        margin: 0px!important; 
        margin-right: 10px; 
    }

    .review-post > .post-header > h5 {
        display: inline-block;
        padding: 5px; 
        color: var(--default-retaurantcard-color);   
    }

    .pictures-container {
        padding: 10px; 
    }

    .picture-container {
        cursor: pointer;
        outline: 2px dashed grey;
        height: 100px; 
        width: 100px; 
        display: inline-block; 
        position: relative;
        margin-right: 20px; 
    }

    .picture-container:hover .picture{
        opacity: 0.3
    }

    .picture-container:hover .zoom-in{
        opacity: 1
    }

    .picture {
        opacity: 1;
        height: 100px; 
        width: 100px; 
        transition: .5s ease;
        backface-visibility: hidden;
    }

    .zoom-in {
        font-size: 24px; 
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }

    @media(max-width: 1500px) {
        .margin-right {
            margin-right: 5% !important;
        }
    }

</style>