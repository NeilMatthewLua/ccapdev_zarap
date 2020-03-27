<template>
  <div class="review-post">
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
        <div class="col s2 valign-wrapper" >
            <i class="material-icons">arrow_upward</i>
            <h5 class="green-text upvotes">{{this.reviewData.upvotes}}</h5>
            <i v-bind:class="{'liked' : this.isLiked}" 
            @click="toggleLike()"
            class="material-icons right-align pointer" v-if="!this.isOwn && this.isLogged">thumb_up</i> 
            <!-- TODO only for people logged in -->
        </div>
        <!-- Edit and Delete Review Buttons if own Review -->
        <div class="col s2 valign-wrapper margin-right" v-if="this.isOwn">
            <a class="submit-btn green btn pointer" @click="editReview()"><i class="material-icons review-icons">edit</i></a>
            <a class="submit-btn red btn pointer" @click="deleteReview()"><i class="material-icons review-icons">delete</i></a>
        </div>
      </div>
    <p ref="data">{{this.reviewData.review}}
    </p>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'; 
import router from '@/router';
export default {
    name: "ReviewPost",
    props: {
        inProfile: Boolean, //If the review is viewed inside the profile page
        reviewData : Object, //Review object passed
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
            return this.isLogged() ? ((this.isLikedReview().length > 0) ? true : false) : false; 
        }, 
    },
    methods: {
        ...mapActions(['updatePostLikes']),
        ...mapGetters(['getUser','isLikedReview']),
        ...mapMutations(['setLikedReview', 'removeLikedReview']),
        async toggleLike() {  
            //Add or remove review from user state
            //Add or remove review from db and update related entries (user liked reviews, review upvotes, review author points)
            if(this.isLiked) {
                this.removeLikedReview(this.reviewData.reviewID); 
                this.reviewData.upvotes -= 1; 
                await this.updatePostLikes(this.getUser().userID, this.reviewData.reviewID, this.reviewData.reviewerID, -1); 
            }
            else {
                this.setLikedReview(this.reviewData.reviewID); 
                this.reviewData.upvotes += 1; 
                await this.updatePostLikes(this.getUser().userID, this.reviewData.reviewID, this.reviewData.reviewerID, 1); 
            }
        }, 
        editReview() {
            this.$emit('edit-Review', this.$refs.data.innerHTML); 
        }, 
        deleteReview() {
            this.$emit('delete-Review');
        }, 
        goToProfile() {
            router.push({ name: 'UserDetail', params: { id : this.reviewData.reviewerID, menu : "review" } });
        }, 
        goToRestaurant() {
            router.push({ name: 'Display Restaurant', params: { id : this.reviewData.restaurantID } });
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

    @media(max-width: 1500px) {
        .margin-right {
            margin-right: 5% !important;
        }
    }

</style>