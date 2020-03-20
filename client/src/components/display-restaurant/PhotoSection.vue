<template>
  <div class="photos">
        <div class="carousel-container">
          <h3>Golden Fortune {{title}}</h3>
          <div class="carousel carousel-slider">
            <a class="carousel-item" href="" v-for="url in urls" :key="url.url"><img :src="url.url"></a>
            <a class="carousel-item" href="" ><img :src="urls[0].url"></a>
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
    data() {
      return {
        urls: [
          {url: require("../../assets/pictures/golden-menu.jpg")},
          {url: require("../../assets/pictures/Golden Fortune-1.jpg")}
        ]
      };
    },
    mounted() {
      M.AutoInit();
    }
}
</script>

<style scoped>
  .photos {
    text-align: center;
  }

  .carousel-container {
      padding: 20px; 
      background-color: var(--default-restaurantcard-color);
      margin-bottom: 40px; 
      height: auto; 
  }

  .carousel {
      height: 100%; 
      min-height: 600px; 
      overflow-x: hidden;
      overflow-y: scroll;
  }

  .carousel-item {
      height: 100%; 
      width: 100%; 
      overflow-y: scroll;
  }
</style>