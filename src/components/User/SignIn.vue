<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-xs3>
                <v-card>
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
                            <v-form @submit.prevent="onSignIn">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="username"
                                            label="Username"
                                            id="username"
                                            type="text"
                                            v-model="username"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            :type=" show ? 'text': 'password'"
                                            v-model="password"
                                            :append-icon="show ? 'visibility' : 'visibility_off' "
                                            @click:append="show = !show"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <router-link to="/forgotpassword">Forgot Password </router-link>
                                    </v-flex>
                                </v-layout>
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6>
                                            <v-btn color="blue--text" type="submit">Sign In</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-actions>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'SignIn',
    data: () => ({
        username: '',
        password: '',
        show: false
    }),
    computed: {
        user (){
            return this.show
        }
    },
    watch: {
        user (value){
            if (value){
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignIn (){
            if (this.$store.getters.getUser.username === this.username && this.$store.getters.getUser.password === this.password){
                console.log('Hello You are authenticated')
                this.show = true
            }
            else {
                console.log('Something is wrong')
            }
        }
    }
}
</script>