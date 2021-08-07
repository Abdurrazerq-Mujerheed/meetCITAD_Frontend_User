<template>
   <v-footer height="auto">
      <v-layout row wrap justify-center mt-3>
          <a href="https://www.facebook.com/CITAD3" target="_blank" rel="noopener noreferrer"><v-icon large>mdi-facebook</v-icon></a>
          <a href="https://www.twitter.com/ictadvocate" target="_blank" rel="noopener noreferrer"><v-icon large>mdi-twitter</v-icon></a>
          <a href="https://www.citad.org" target="_blank" rel="noopener noreferrer"><v-icon large>mdi-web</v-icon></a>
          <v-flex xs12 py-3 text-center blue--text>
              &copy; {{ new Date().getFullYear() }} —
              <strong>CITAD</strong>
          </v-flex>
      </v-layout>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
    text-decoration: none;
    padding-right: 10px;
}
</style>
