<template>
  <v-container>
    <v-layout row wrap>
      <v-row class="style">
        <v-col cols="12">
          <v-card>
            <v-toolbar color="primary" dense dark>
              <v-toolbar-items>
                <h2> Set New Password </h2>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <h3>Please enter a new Password</h3>
              <form method="post" @submit.prevent="submitRequest">
                <div>
                  <v-text-field
                    name="new_password"
                    label="New Password"
                    v-model="newPassword"
                    type="password"
                    :rules="[() => value.length > 0 || 'This field is required']"
                    required
                  ></v-text-field>

                </div>
                <div>
                  <v-text-field
                    :class="{invalid: $v.comfirm.$error}"
                    name="comfirm_password"
                    label="Comfirm Password"
                    v-model="comfirmPassword"
                    type="password"
                    :rules="[() => value.length > 0 || 'This field is required']"
                    required                    
                    @blur="$v.comfirm.$touch()"
                  ></v-text-field>
                </div>


                <v-btn color="primary" type="submit">Save</v-btn>
              </form>    
            </v-card-text>
          </v-card>
          
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { sameAs } from 'vuelidate/lib/validators'

export default {
  props:['token'],
  data() {
    return {
      newPassword: '',
      comfirmPassword: ''
    }
  },

  methods: {
    submitRequest() {
      let passwordData = {
        password: this.newPassword,
        token: this.token
      }
      this.$store.dispatch('newPassword', passwordData)
    }
  },

  validations: {
    comfirm: {
      sameAs: sameAs(vm => {
        return vm.newPassword
      })
    }
  },

}
</script>

<style scoped>
  .v-text-field.invalid {
    color: red;
    border: 1px solid red;
  }
  .style {
    position: relative;
    margin-left: 300px;
    margin-top: 100px;
    max-width: 600px;
  }
</style>