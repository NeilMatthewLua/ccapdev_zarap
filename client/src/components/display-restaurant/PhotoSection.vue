<template>
  <div class="photos">
        <div class="carousel-container">
          <h3>Golden Fortune {{title}}</h3>
          <!-- Carousel for pictures -->
            <Carousel :perPageCustom="[[480, 1]]" :navigationEnabled="true"> 
                <Slide v-for="url in this.urls" :key="url.url"><img :src="url.url" class="carousel-item"></Slide> 
            </Carousel> 
        </div>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
// import M from 'materialize-css';
export default {
    name: "PhotoSection",
    components: {
      Carousel, 
      Slide 
    },
    props: {
      title: String, //Title of Photo section (Menu / Photos)
      urls : Array
    }
}
</script>

<style scoped>
  .photos {
    text-align: center;
  }

  .carousel-container {
      padding: 30px; 
      width: 100%; 
      background-color: var(--default-restaurantcard-color);
      margin-bottom: 40px; 
      text-align: center; 
      height: auto; 
  }

   .carousel-item {
      height: auto; 
      width: 80%;
      overflow-y: scroll;
  } 
</style>