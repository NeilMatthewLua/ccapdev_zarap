<template>
  <div class="photos">
        <div class="carousel-container">
          <h3>Golden Fortune {{title}}</h3>
          <div class="carousel carousel-slider">
            <a class="carousel-item" href=""><img src="../../assets/pictures/golden-menu.jpg"></a>
            <a class="carousel-item" href=""><img src="../../assets/pictures/Golden Fortune-1.jpg"></a>
          </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    name: "PhotoSection",
    props: {
      title: String //Title of Photo section (Menu / Photos)
    }, 
    mounted() {
      M.AutoInit(); 
    }
}
</script>

<style scoped>
@import '../../assets/css/view-restaurant/photo-section.css';
</style>