<template>
  <v-app app class="style" >
    <!-- NavBar section -->
      <appNavigation />

    <!-- Main Content -->
      <v-main class="mx-5 my-4">
        <!-- <component :is="componentId" v-if="auth"></component> -->
        <router-view></router-view>
      </v-main>

    <!-- Footer section -->
      <appFooter />
  </v-app>
</template>

<script>
import Footer from './views/Footer.vue';
import NavBar from './views/NavBar.vue';
// import Welcome from './views/Welcome.vue'

export default {
  name: 'App',

  data: () => ({
    //
    // componentId: 'Welcome'
  }),

  components: {
    appNavigation: NavBar,
    appFooter: Footer,
    // Welcome
  }
  }

</script>

<style scoped>
  .style {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    background-color: rgb(52, 52, 211);
    color: white;
  }
</style>