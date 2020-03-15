<template>
  <div class="photos">
        <div class="carousel-container">
          <h3>Golden Fortune {{title}}</h3>
          <div class="carousel carousel-slider">
            <a class="carousel-item" href="" v-for="url in urls" :key="url.url"><img :src="url.url"></a>
          </div>
        </div>
    </div>
</template>

<script>
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
    }
}
</script>

<style scoped>
  .carousel-item {
      overflow-y: scroll; 
  }
</style>