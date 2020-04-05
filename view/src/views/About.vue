<template>
    <div>
        <Navbar :hasSearch="true" :hasFilter="false"/>
        <div class="container">
            <h4>NPM-Packages Used:</h4>
            <h6 v-for="item in packages" :key="item">{{item}}</h6>
            <br/> 
            <h4>Third-party Libraries Used:</h4>
            <h6 v-for="item in libraries" :key="item">{{item}}</h6>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'; 
export default {
    name: "About", 
    components: {
        Navbar
    }, 
    data() {
        return {
            packages: [
                "axios 0.19.2",
                "core-js 3.6.4",
                "epic-spinners 1.1.0",
                "material-design-icons 3.0.1",
                "materialize-css 1.0.0",
                "body-parser 1.19.0",
                "dotenv 8.2.0",
                "express 4.17.1",
                "faker 4.1.0",
                "fs-extra 9.0.0",
                "mongodb 3.5.5",
                "mongoose 5.9.4",
                "multer 1.4.2",
                "validator 12.2.0",
                "vue 2.6.11",
                "vue-carousel 0.18.0",
                "vue-router 3.1.5",
                "vuex 3.1.3"
            ],
            libraries: [
                "Materialize-css 3.5.1",
                "Vue",
                "Vuex",
                "Vue Router"
            ]

        }
    }

}
</script>

<style>

</style>