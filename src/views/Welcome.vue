<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="3">
                <div>
                    <v-img
                        src="../assets/image/citad.jpeg"
                        height="200"
                        width="200"
                        position="center"
                    ></v-img>
                </div>
            </v-col>
            <v-col cols="12" sm="7" class="text-center mt-5">
                <h3 class="display-3">Welcome to meetCITAD</h3>
                <span class="subheading">Center for Information Technology and Development <br>
                    <v-icon x-large>event</v-icon>
                </span>
                <div class="title styleBtn">An Event application that shades more light on event regarding to CITAD</div>
                <v-divider class="styleBtn"></v-divider>
                    <v-flex class="mt-5">
                        <v-btn large color="primary" to="/signin" plain outlined class="mx-0 mr-3">Sign In</v-btn>
                        <v-btn large color="primary" to="/signup" plain outlined class="mx-0">Sign Up</v-btn>
                    </v-flex>
            </v-col>
        </v-row>
            
    </v-container>
</template>

<script>
export default {
    name: 'Welcome'
} 
</script>

<style scoped>
   .styleBtn {
       margin-top: 3em;
   }
</style>