<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-container grid-list-xs>
        <v-layout row wrap xs12 sm6>
            <v-flex xs12>
                <v-tabs vertical>
                  <v-tab align-center>
                    <v-icon left>person</v-icon>
                    <span>User Information</span>
                  </v-tab>
                  <v-tab class="text-left">
                    <v-icon left>lock</v-icon>
                    <span>Change Password </span>
                  </v-tab>

                  <v-tab-item
                    reverse-transition="tab-reverse-transition"
                    transition="tab-transition"
                  >
                    <v-form @submit.prevent="onSubmitData" :disabled="isDisplay">
                      <v-card>
                              <v-toolbar dense flat>
                                  <h3>Personal Information</h3>
                                  <v-spacer></v-spacer>
                                  <v-btn  @click.prevent="isDisplay = !isDisplay">
                                      <v-icon>mdi-pencil</v-icon>
                                  </v-btn>
                              </v-toolbar>
                          <v-card-text>
                              <template>
                                  <v-layout row  justify-center>
                                    <v-img src="" height="250" position="center">
                                      <v-flex xs4 sm12 class="text-xs-left text-sm-center">
                                          <v-badge
                                          bordered
                                          bottom
                                          location="center"
                                          icon="add_a_photo"
                                      >
                                          <v-avatar size="large">
                                          <v-img src="" v-model="userInfo.profilePic"></v-img>
                                          </v-avatar>
                                      </v-badge>
                                      </v-flex>
                                      <v-flex xs7 mt-9 class="white--text text-center">
                                          <h3>{{ userInfo.fullName }}</h3>
                                          <p class="">{{ userInfo.username }}</p>
                                      </v-flex>
                                    </v-img>
                                  </v-layout>
                              </template>
                              <v-text-field
                                  name="fullName"
                                  label="Full Name"
                                  v-model="userInfo.fullName"
                                  type="text"
                                  :style="{display: isDisplay ? 'none' : ''}"
                              ></v-text-field>
                              <v-text-field
                                  name="username"
                                  label="Username"
                                  v-model="userInfo.username"
                                  type="text"
                                  :style="{display: isDisplay ? 'none' : ''}"
                              ></v-text-field>
                              <v-text-field
                                  name="email"
                                  label="E-mail"
                                  v-model="userInfo.email"
                                  type="email"
                              ></v-text-field>
                              <v-text-field
                                  name="address"
                                  label="Address"
                                  v-model="userInfo.address"
                              ></v-text-field>
                              <template>
                                <vue-tel-input v-model="userInfo.phone" aria-label="Phone"></vue-tel-input>
                              </template>
                              <v-text-field
                                  name="organisation"
                                  label="Organisation"
                                  v-model="userInfo.organisation"
                              ></v-text-field>
                              <v-textarea
                                  label="Biography"
                                  v-model="userInfo.bio"
                              >
                              </v-textarea>
                          </v-card-text>
                          <v-card-actions class="justify-center">
                              <v-btn class="blue--text text--darken-3" type="submit">Update</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-form>
                  </v-tab-item>

                  <v-tab-item
                    reverse-transition="tab-reverse-transition"
                    transition="tab-transition"
                  >
                    <v-container grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-card>
                            <v-toolbar dense flat>
                              <v-toolbar-title><h3>Change Password</h3></v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                              <v-form @submit="onChangePassword">
                                <v-layout row wrap>
                                  <v-flex xs12>
                                    <v-text-field
                                      name="currentPswd"
                                      v-model="currentPswd"
                                      label="Current Password"
                                      :type="type ? 'text' : 'password'"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout row wrap>
                                  <v-flex xs12>
                                    <v-text-field
                                      name="newPswd"
                                      v-model="userInfo.newPswd"
                                      label="New Password"
                                      :type="type ? 'text' : 'password'"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                  <v-flex xs12>
                                    <v-text-field
                                      name="comfirmPswd"
                                      v-model="comfirmPswd"
                                      label="Comfirm Password"
                                      :type="type ? 'text' : 'password'"
                                      :rules="[comparePswd]"
                                    ></v-text-field>

                                    <v-checkbox 
                                      label="Show Password" 
                                      v-model="type" 
                                      value="type"></v-checkbox>
                                  </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                  <v-flex xs12>
                                    <v-btn color="info" type="submit">Update</v-btn>
                                  </v-flex>
                                </v-layout>
                              </v-form>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
    name: 'Profile',
    data (){
        return{
            isDisplay: false,
            type: false,
            currentPswd: '',
            comfirmPswd: '',
            newPswd: '',
            userInfo: {}
            // userInfo: {
            //   id: this.getId(),
            //   fullname: '',
            //   username: '',
            //   email: '',
            //   address: '',
            //   phone: '',
            //   organisation: '',
            //   biography: '',
            //   profilePic: ''
            // }
        }
    },


    // methods: {
    //   onSubmitData() {
    //     console.log(this.userInfo);
    //     return this.$store.dispatch('UserData', this.userInfo);
    //   },

    //   onChangePassword() {
    //     return this.$store.dispatch('changePassword', {
    //       userId: this.getId,
    //       password: this.currentPswd,
    //       newPassword: this.newPswd
    //     })
    //   }
    // },

    // computed: {
    //   getId() {
    //     return this.$store.state.userDetail.id
    //   },
    //   comparePswd() {
    //     return (this.userInfo.newPswd === this.comfirmPswd) ? '' : "Please the password does not match"
    //   }
    // }

}
</script>

<style scoped>

</style>