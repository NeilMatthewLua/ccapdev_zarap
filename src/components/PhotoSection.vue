<template>
  <div class="photos">
        <div class="carousel-container">
          <h3>Golden Fortune {{title}}</h3>
          <h5 id = "page-count"></h5>
          <div class="carousel carousel-slider">
            <a class="carousel-item" href="#one!"><img src="../assets/pictures/Golden Fortune-1.jpg"></a>
            <a class="carousel-item" href="#two!"><img src="../assets/pictures/golden-menu.jpg"></a>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PhotoSection",
    props: ["title"]
}
</script>

<style scoped>
  @import '../assets/css/view-restaurant.css';
</style>