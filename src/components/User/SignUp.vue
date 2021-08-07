<template>
   <v-container>
        <v-img
            src="@/assets/image/bg-image3.jpeg"
            position="center"
            contain
        >
       <v-layout row wrap>
           <v-flex xs12 sm6 order-xs12 offset-sm3 mt-5>
               <v-card>
                   <v-card-text v-if="message">
                        <v-snackbar
                        v-model="snackbar"
                        :timeout="3000"
                        :top="true"
                        color="error"
                        >
                        {{ message }}

                        <template v-slot:action="{ attrs }">
                            <v-btn
                            color="blue"
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                            >
                            x
                            </v-btn>
                        </template>
                        </v-snackbar>
                    </v-card-text>
                   <v-card-title >
                       <v-layout row wrap>
                           <v-flex xs12 class="text-center">
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
                                           v-model.trim="fullname"
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
                                           v-model.trim="email"
                                           hint="Please use an active mail"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="organisation"
                                           label="Organisation"
                                           v-model.trim="organisation"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                                <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-text-field
                                           name="phone"
                                           label="Phone Number"
                                           v-model.trim="phone_number"
                                           type="tel"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>               
                               <v-layout row wrap>
                                   <v-flex xs12>
                                       <v-select
                                           :items="genders"
                                            v-model.trim="gender"
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
                                           v-model.trim="username"
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
                                           v-model.trim="password"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                               <v-layout row wrap>
                                   <v-flex xs12 :class="{invalid: $v.comfirmPassword.$error}">
                                       <v-text-field
                                           name="comfirmPassword"
                                           label="Comfirm Password"
                                           type="password"
                                           v-model.trim="comfirmPassword"
                                           @blur="$v.comfirmPassword.$touch()"
                                           required
                                       ></v-text-field>
                                   </v-flex>
                               </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 class="text-center">
                                        <v-btn type="submit">Sign Up</v-btn>
                                    </v-flex>
                                </v-layout>
                           </v-form>
                       </v-container>
                   </v-card-text>
               </v-card>
           </v-flex>
       </v-layout>
        </v-img>
   </v-container>
</template>

<script>
import { sameAs } from 'vuelidate/lib/validators'
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
        phone_number: '',
        genders: ['Male', 'Female', 'Others'],
        snackbar: false
    }),

    methods: {
        onSignUp (){
            this.snackbar = true
            this.$store.dispatch('userSignUp', {
                fullname: this.fullname,
                email: this.email,
                username: this.username,
                password: this.password,
                organisation: this.organisation,
                phone: this.phone_number,
                gender: this.gender
            })
        }
    },
    
    computed: {
        message() {
            return this.$store.getters.error
        }
    },

    validations: {
        comfirmPassword: {
            sameAs: sameAs('password')
        }
    }
}
</script>

<style scoped>
    .v-text-field.invalid {
        border: 1px solid red;
    }
    .v-text-field.label.invalid {
        border: 1px solid red;
    }    
</style>