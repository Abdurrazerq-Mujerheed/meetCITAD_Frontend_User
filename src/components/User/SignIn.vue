<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-xs3>
                <v-card>
                    <v-card-text v-if="error">
                        <v-snackbar
                            v-model="value"
                            :top="true"
                            color="warning"
                            timeout="3000"
                            outlined
                        >
                           {{ error }}
                            <v-btn text color="primary" @click.native="value = false">Cancel</v-btn>
                        </v-snackbar>
                    </v-card-text>
                    <v-card-title>
                       <v-layout row wrap>
                           <v-flex xs12 class="text-sm-center">
                               <v-avatar
                                   size="100"
                               >
                                   <img src="@/assets/image/citad.jpeg" alt="alt">
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
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6 justify-center>
                                            <v-btn color="blue--text" type="submit">Sign In</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-actions>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
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
        value: false
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

    },

    components: { 
      ForgotPassword 
    },


}
</script>

<style scoped>
   
</style>