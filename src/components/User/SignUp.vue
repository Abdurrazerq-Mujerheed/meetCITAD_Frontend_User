<template>
   <v-container>
       <v-layout row wrap>
           <v-flex xs12 sm6 offset-xs3>
               <v-card>
                   <v-card-title >
                       <v-layout row wrap>
                           <v-flex xs12 class="text-sm-center">
                               <h2>Create Account</h2>
                           </v-flex>
                       </v-layout>
                   </v-card-title>
                   <v-card-text>
                        <p style="align: center">Already have an account. <router-link to="/signin">Sign In</router-link></p>
                       <v-container>
                           <v-form @submit.prevent="onSignUp">
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="fullname"
                                           label="Full Name"
                                           id="fullname"
                                           type="text"
                                           v-model="fullname"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="email"
                                           label="Email"
                                           id="email"
                                           type="email"
                                           v-model="email"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
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
                                           type="password"
                                           v-model="password"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="comfirmPassword"
                                           label="Comfirm Password"
                                           id="comfirmPassword"
                                           type="password"
                                           v-model="comfirmPassword"
                                           :rules="[matchPassword]"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               
                               <v-card-actions>
                                   <v-spacer></v-spacer>
                                  <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-btn type="submit">Sign Up</v-btn>
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
    name: 'Signup',
    data: () => ({
        fullname: '',
        email: '',
        username: '',
        password: '',
        comfirmPassword: ''
    }),
    computed: {
        matchPassword (){
            return this.password === this.comfirmPassword ? '' : 'Please check, the password doesnt match'
        },
        user (){
            return this.$store.getters.getUser
        }
    },
    watch: {
        user (value){
            if (value !== null && value !== undefined){
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignUp (){
            this.$store.dispatch('UserData', {
                fullname: this.fullname,
                email: this.email,
                username: this.username,
                password: this.password,
            })
        }
    }
}
</script>