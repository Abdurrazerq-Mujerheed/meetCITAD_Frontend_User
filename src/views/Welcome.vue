<template>
    <v-container fluid>
        <v-img
            src="../assets/image/bg-image2.jpeg"
            position="center"
            contain
            eager
        >
        <v-row class="d-flex justify-center mt-5">
            <v-col cols="12" sm="7" class="text-center" style="margin-top: 25px">
                <h3 class="display-4">Welcome to meetCITAD</h3>
                <!-- <span class="subheading">Center for Information Technology and Development <br>
                    <v-icon x-large>event</v-icon>
                </span> -->
                <div class="title" style="margin-top: 50px">An Event application that shades more light on event regarding to CITAD</div>
                <v-divider></v-divider>
                    <v-flex class="mt-5">
                        <v-btn large to="/signin" plain outlined class="mx-0 mr-3">Sign In</v-btn>
                        <v-btn large to="/signup" plain outlined class="mx-0">Sign Up</v-btn>
                    </v-flex>
            </v-col>
        </v-row>
        </v-img>
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