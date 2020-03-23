<template>
  <div class="review-post">
      <div class="row valign-wrapper">
        <div class="valign-wrapper col s10"  v-if="!inProfile">
            <img class="post-author-pic" src = "@/assets/pictures/neil.jpg">
            <!-- Change Route to user profile -->
            <a :href="`/userdetail/${this.reviewData.userID}/menu`"><h4 class="post-author">{{this.reviewAuthor.name}}</h4></a>
            <h5 class="post-rating #388e3c green white-text darken-2">{{reviewData.rating}}</h5>
        </div>
        <div class="valign-wrapper col s11"  v-if="inProfile">
            <img class="post-author-pic" src = "@/assets/pictures/Golden Fortune-1.jpg">
            <h4 class="post-author"><a :href="`/restaurant/${this.reviewRestaurant.restaurantID}`"><strong>{{this.reviewRestaurant}}</strong></a></h4>
            <h5 class="post-rating #388e3c green white-text darken-2">{{reviewData.rating}}</h5>
        </div>
        <div class="col s2 valign-wrapper" v-if="!isOwn">
            <h5 class="green-text upvotes">{{reviewData.upvotes}}</h5>
            <i v-bind:class="{'liked' : isLiked}" 
            @click="toggleLike"
            class="material-icons right-align pointer">thumb_up</i> 
            <!-- only for people logged in -->
        </div>
        <div class="col s2 valign-wrapper margin-right" v-else>
            <a class="submit-btn green btn pointer" @click="editReview()"><i class="material-icons review-icons">edit</i></a>
            <a class="submit-btn red btn pointer" @click="deleteReview()"><i class="material-icons review-icons">delete</i></a>
        </div>
      </div>
    <p ref="data">{{reviewData.review}}
    </p>
    </div>
</template>

<script>
export default {
    name: "ReviewPost",
    props: {
        isLiked: Boolean, //TODO CHANGE TO CHECK DYNAMICALLY HERE
        isOwn: Boolean, //If the review was also posted by the current user
        inProfile: Boolean, //If the review is viewed inside the profile page
        reviewData : Object, //Review object passed
        restaurantData : Object
    }, 
    computed: {
        //Display Review Author
        reviewAuthor () {
            return this.$store.getters.fetchReviewPostUser(this.reviewData.reviewerID); 
        }, 
        //Display Name of Restaurant in Review
        reviewRestaurant () {
            return this.$store.getters.fetchReviewPostUser(this.restaurantData.reviewerID)
        }
    },
    methods: {
        toggleLike() {
            this.isLiked = !this.isLiked; 
            //Backend patch to no. of likes
        }, 
        editReview() {
            this.$emit('edit-Review', this.$refs.data.innerHTML); 
        }, 
        deleteReview() {
            this.$emit('delete-Review');
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