<template>
  <div class="photos">
        <div class="carousel-container">
          <h3>{{this.restoDetails.name}} {{title}}</h3>
          <!-- Carousel for pictures -->
            <Carousel :perPageCustom="[[480, 1]]" :navigationEnabled="true"> 
                <Slide v-for="(url, index) in this.urls" :key="url.url">
                  <img :src="url.url" :data-id="index" @click="getUrl" class="carousel-item">
                </Slide> 
            </Carousel> 
            <PictureModal :url="this.urls[this.pictureIndex].url"  
                          @close="closeModal()" @change-pic="this.changePic"
                          v-show="modalVisible"/> 
        </div>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import PictureModal from '@/components/PictureModal'; 
export default {
    name: "PhotoSection",
    components: {
      Carousel, 
      Slide, 
      PictureModal  
    },
    data() {
      return {
        pictureIndex : 0,
        modalVisible : false
      }
    },
    props: {
      title: String, //Title of Photo section (Menu / Photos)
      urls : Array,
      name : String 
    },
    computed: {
      //Gets Restaurant Details for Current Restaurant 
      restoDetails () {
        return this.$store.getters.fetchCurrResto; 
      }
    }, 
    methods: {
      getUrl(e) {
        this.pictureIndex = e.target.dataset.id
        this.modalVisible = true
      },
      closeModal() {
        this.modalVisible = false
      },
      changePic(direction) {
        this.pictureIndex = ((parseInt(this.pictureIndex) + parseInt(direction)) % this.urls.length + parseInt(this.urls.length)) % this.urls.length; 
      },
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