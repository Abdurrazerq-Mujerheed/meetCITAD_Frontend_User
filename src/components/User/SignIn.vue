<template>
    <v-container grid-list-xs>
        <v-img
            src="@/assets/image/bg-image3.jpeg"
            position="center"
            contain
        >
        <v-layout row wrap  style="margin-top:50px">
            <v-flex xs12 sm6 order-xs12 offset-sm3>
                <v-card>
                    <v-card-title>
                    <div align-center v-if="error">
                        <v-snackbar
                        v-model="snackbar"
                        :timeout="2000"
                        :top="true"
                        color="error"
                        >
                        {{ error }}

                        <template v-slot:action="{ attrs }">
                            <v-btn
                            color=""
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                            >
                            x
                            </v-btn>
                        </template>
                        </v-snackbar>
                    </div>
                    <div align-center v-if="message">
                        <v-snackbar
                        v-model="snackbar"
                        :timeout="2000"
                        :top="true"
                        color="success"
                        >
                        {{ message }}

                        <template v-slot:action="{ attrs }">
                            <v-btn
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                            >
                            x
                            </v-btn>
                        </template>
                        </v-snackbar>
                    </div>                     
                       <v-layout row wrap>
                           <v-flex xs12 class="text-center">
                               <v-avatar
                                   size="100"
                               >
                                   <img src="@/assets/image/avatar.png" alt="alt">
                               </v-avatar>
                               <h2>Sign In</h2>
                           </v-flex>
                       </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <p>Not registered yet. <router-link to="/signup">Sign Up</router-link></p>
                            <form @submit.prevent="onSignIn" method="POST">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="username"
                                            label="Username"
                                            type="text"
                                            v-model="username"
                                            outlined
                                            required
                                        ></v-text-field>
                                        
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap mt-2>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            :type=" show ? 'text': 'password'"
                                            v-model="password"
                                            :append-icon="show ? 'visibility' : 'visibility_off' "
                                            @click:append="show = !show"
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <ForgotPassword />
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 class="text-center">
                                        <v-btn color="blue--text" type="submit">Sign In</v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        </v-img>
    </v-container>
</template>

<script>
import ForgotPassword from './ForgotPassword.vue'

export default {
    name: 'SignIn',
    data: () => ({
        username: '',
        password: '',
        show: false,
        snackbar: false
    }),

    methods: {
        onSignIn (){
            this.snackbar = true
            return this.$store.dispatch('userSignIn', {
                username: this.username, 
                password: this.password
            })
        }
    },

    computed: {
        error() {
            return this.$store.getters.error
        },

        message() {
            return this.$store.getters.message
        }

    },

    components: { 
      ForgotPassword 
    },


}
</script>

<style scoped>
   
</style>