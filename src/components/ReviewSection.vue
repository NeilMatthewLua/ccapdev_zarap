<template>
<div class="review-section">
    <div class="write-review">
        <a class="review-btn waves-effect waves-light btn #388e3c green darken-2">Write Review</a>
    </div>
    <div class="view-review">
        <h3><strong>Reviews</strong></h3>
        <div class="view-review-subsection row">
            <a class="col s3 center" href="#">Popular</a>
            <a class="col s3 center" href="#">All Reviews</a>
        </div>
        <div class="review-feed">
            <div class="review-post">
                <div class="post-header valign-wrapper">
                    <img class="post-author-pic" src = "../assets/pictures/neil.jpg">
                    <h4 class="post-author"><strong>Neil Lua</strong></h4>
                    <h5 class="post-rating #388e3c green darken-2">5.0</h5>
                </div>
                <p class="post-desc">I had a date with hubby here. I enjoyed so much!! Mwah mwah, labyu hubby. It was more 
                than just a restaurant. It was an experience.
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ReviewSection"
}
</script>

<style scoped>
    @import '../assets/css/view-restaurant-review.css';
</style>