<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title xs12 sm6 offset-sm3>
                        <h3 style="padding: 50px 50px 30px 100px; text-align: center"> Forgot Password</h3>
                    </v-card-title>
                        
                    <v-card-text>
                        <v-container mt-4 justify-center>
                            <v-layout row wrap>
                                <v-flex 12>                                                                     
                                    <p>No worries! Enter your email and we will send you a reset link</p>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap pt-5 pb-8>
                                <v-flex xs12>
                                    <v-text-field prepend-inner-icon="mail" label="Email" v-model="email"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    
                    <v-card-actions >
                        <v-btn block color="primary" dark>Send Request</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Forgotpassword',
    data(){
        return {
            email: ''
        }
    }
}
</script>