<template>
  <div>
    <Navbar :hasSearch="true" :isLogged="false"/>
    <SearchContent/>
    <Footer/> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import SearchContent from '@/components/SearchContent.vue';

export default {
    name: "SearchResult",
    components: {
        Navbar,
        SearchContent,
        Footer,
    }
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