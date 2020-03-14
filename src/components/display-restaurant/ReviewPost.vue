<template>
  <div class="review-post">
      <div class="row valign-wrapper">
        <div class="valign-wrapper col s11">
            <img class="post-author-pic" src = "../../assets/pictures/neil.jpg">
            <h4 class="post-author"><a href=""><strong>Neil Lua</strong></a></h4>
            <h5 class="post-rating #388e3c green white-text darken-2">5.0</h5>
        </div>
        <div class="col s1 valign-wrapper" v-if="!isOwn"><i 
            v-bind:class="{'liked' : isLiked}" 
            @click="toggleLike"
            class="material-icons right-align pointer">thumb_up</i>
        </div>
        <div class="col s2 valign-wrapper" v-else>
            <a class="submit-btn green btn pointer" @click="editReview()"><i class="material-icons review-icons">edit</i></a>
            <a class="submit-btn red btn pointer" @click="deleteReview()"><i class="material-icons review-icons">delete</i></a>
        </div>
      </div>
    <p ref="data">{{postContent}}
    </p>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    name: "ReviewPost",
    mounted() {
        M.AutoInit(); 
    },
    props: {
        isLiked: Boolean, //If the review has been liked by the current user
        isOwn: Boolean //If the review was also posted by the current user
    }, 
    data() {
        return {
            postContent: "I had a date with hubby here. I enjoyed so much!! Mwah mwah, labyu hubby. It was more than just a restaurant. It was an experience."
        }; 
    },
    methods: {
        toggleLike() {
            this.isLiked = !this.isLiked; 
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

<style>
@import '../../assets/css/view-restaurant/review-post.css';
</style>