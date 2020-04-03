<template>
  <div>
    <Navbar :hasSearch="true" :isLogged="false" :hasFilter="true" />
    <SearchContent/>
    <Footer/> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import SearchContent from '@/components/search-restaurant/SearchContent.vue';
// import { mapActions} from 'vuex';
// import router from '@/router'

export default {
    name: "SearchResult",
    components: {
        Navbar,
        SearchContent,
        Footer,
    },
    // methods: {
    //   ...mapActions(['getSearchRestos', 'getSearch'])
    // },
    // async beforeRouteLeave(to, from, next) {
    //   let key = this.$route.query.search
    //   console.log(key);
    //   await this.getSearchRestos(key);
    //   await this.getSearch(key);
    //   router.push({path: '/searchresult', query: {search : this.search}}).catch(() => {});
    //   next();
    // },
}
</script>

<style scoped>
  body {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
  }

  main {
      flex: 1 0 auto;
  }
</style>