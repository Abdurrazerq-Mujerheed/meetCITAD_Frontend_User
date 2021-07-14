<template>
  <v-container>
    <v-layout row wrap>
      <v-row>
        <v-col>
          <h3>Please enter a new Password</h3>
          <form method="post" @submit.prevent="submitRequest">
            <v-text-field
              name="new_password"
              label="New Password"
              v-model="newPassword"
              type="password"
            ></v-text-field>

            <v-text-field
              name="comfirm_password"
              label="Comfirm Password"
              v-model="comfirmPassword"
              type="password"
            ></v-text-field>

            <v-btn color="primary" type="submit">Save</v-btn>
          </form>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
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
      if(this.new_password !== this.comfirm_password) {
        return alert("Please Check the password is not the same")
      }
      let passwordData = {
        password: this.newPassword,
        token: this.token
      }
      this.$store.dispatch('newPassword', passwordData)
    }
  }
}
</script>

<style>

</style>