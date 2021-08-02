<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
          style="cursor: pointer; text-decoration: underline"
        >
          forgot password
        </div>
      </template>

      <v-card xs12 sm6 offset-sm3>
        <v-card-text v-if="fakeMail">
          <v-snackbar
            top
            color="warning"
            timeout="3000"
            outlined
          >
            {{ fakeMail }}
        </v-snackbar>
        </v-card-text>
        <v-card-title primary-title>
          <v-toolbar color="primary" dense dark>
            <h3 style="text-align: center"> Forgot Password</h3>
          </v-toolbar>
        </v-card-title>
            
        <v-card-text>
            <v-container mt-4 class="justify-center">
                <v-layout row wrap>
                    <v-flex 12>                                                                     
                        <p>No worries! Enter your email and we will send you a reset link</p>
                    </v-flex>
                </v-layout>
                <form method="POST" @submit.prevent="sendRequest">
                <v-layout row wrap pt-5 pb-8>
                    <v-flex xs12>
                        <v-text-field 
                          prepend-inner-icon="mail" 
                          label="Email" 
                          v-model="email" 
                          type="email"
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <div class="text-center mt-3">
                  <v-btn color="primary" class="mr-2" @click="dialog = false">Cancel</v-btn>
                  <v-btn color="primary" class="ml-2" type="submit">Send Request</v-btn>
                </div>
                </form>
            </v-container>
          </v-card-text>
      </v-card>

    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Forgotpassword',
  data(){
    return {
      email: '',
      dialog: false,
      value: false  
    }
  },

  methods: {
    sendRequest() {
      this.$store.dispatch('resetPassword', this.email)
      this.dialog = false
      this.email = ''
    }
  },

  computed: {
    fakeMail() {
      return this.$store.getters.error
    }
  }
}
</script>