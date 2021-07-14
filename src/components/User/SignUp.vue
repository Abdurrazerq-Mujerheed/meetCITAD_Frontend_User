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
                                           type="email"
                                           v-model="email"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="organisation"
                                           label="Organisation"
                                           v-model="organisation"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-select
                                           :items="genders"
                                            v-model="gender"
                                           label="Gender"
                                       ></v-select>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="username"
                                           label="Username"
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
        comfirmPassword: '',
        organisation: '',
        gender: '',
        genders: ['Male', 'Female', 'Others']
    }),
    computed: {
        matchPassword (){
            return this.password === this.comfirmPassword ? '' : 'Please check, the password doesnt match'
        },
        
    },

    methods: {
        onSignUp (){
            this.$store.dispatch('userSignUp', {
                fullname: this.fullname,
                email: this.email,
                username: this.username,
                password: this.password,
                organisation: this.organisation,
                gender: this.gender
            })
        }
    }
}
</script>