<template>
    <div>
        <div class="col s12 m10 l7 squared margin-around hide-on-small">
            <div class="view-review">
                <div>
                    <ReviewPost :isLiked="false" :isOwn="false"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'; 
import ReviewPost from '@/components/display-restaurant/ReviewPost.vue';
export default {
    name: "DiningHistory",
    components: {
        ReviewPost
    },
        methods : {
        editReview (content) { 
            this.isEditing = true;  
            this.$set(this,'editData',content); 
        }, 
        deleteReview() {
            //Deletes Review
        }
    },
    mounted() {
        M.AutoInit();
    }
}
</script>

<style>
    @import '../../assets/css/view-restaurant/review-section.css';
</style>