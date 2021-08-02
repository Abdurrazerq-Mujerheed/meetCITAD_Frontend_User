<template>
    <v-container grid-list-xs>
        <v-img
            src="@/assets/image/bg-image3.jpeg"
            position="center"
            contain
        >
        <v-layout row wrap  style="margin-top:50px">
            <v-flex xs12 sm6 offset-xs3>
                <v-card>
                    <v-card-title>
                    <v-card align-center v-if="error">
                        <v-alert type="error" dismissible v-model="value" :value="true">
                            {{ error }}
                        </v-alert>
                    </v-card>
                    <v-card align-center v-if="message">
                        <v-alert type="success" dismissible v-model="value" :value="true">
                            {{ message }}
                        </v-alert>
                    </v-card>                        
                       <v-layout row wrap>
                           <v-flex xs12 class="text-sm-center">
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
            this.value = true
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