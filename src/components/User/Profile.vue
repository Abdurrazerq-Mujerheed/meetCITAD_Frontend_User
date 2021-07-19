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
                <!-- Profile User!-->
                <form 
                    @submit.prevent="onSubmitData" 
                    :disabled="isDisplay"
                    ref="myForm"
                    enctype="multipart/form-data">
                  <v-card>
                    <v-card-text v-if="error">
                      <v-snackbar
                        color="warning"
                        v-model="value"
                        :timeout="3000"
                      >
                        Error While updating the profile...
                        <v-btn dark flat @click.native="value = false">Close</v-btn>
                      </v-snackbar>
                    </v-card-text>
                    <v-toolbar dense flat>
                        <h3>Personal Information</h3>
                        <v-spacer></v-spacer>
                        <v-btn  @click.prevent="isDisplay = !isDisplay">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <template>
                          <v-layout row justify-center>
                            <v-flex xs5 sm12 class="text-center">
                                <v-avatar class="d-flex justify-center" size="large" rounded="">
                                  <v-img v-if="User.profileImage" :src="`http://localhost:3030/${User.profileImage}`" height="150" width="150"></v-img>
                                  <v-img v-else src="@/assets/image/citad.jpeg" height="150" width="150"></v-img>
                                  <v-img :src="myImage" height="150" width="150"></v-img>
                                </v-avatar>
                                <v-btn text @click="onClicked" class="text-right xs6"><v-icon>add_a_photo</v-icon></v-btn>
                            </v-flex>
                            <v-flex xs6 mt-9 class="text-center">
                                <h3>{{ User.fullname }}</h3>
                                <p class="text-center">{{ User.username }}</p>
                            </v-flex>
                            <input type="file" hidden 
                              name="profileImage"
                              accept="image/*" 
                              @change="onPicked"
                              ref="the_image"/>
                          </v-layout>
                      </template>
                      <v-text-field
                          name="fullname"
                          label="Full Name"
                          v-model="User.fullname"
                          type="text"
                          
                          :style="{display: isDisplay ? 'none' : ''}"
                          
                      ></v-text-field>
                      <v-text-field
                          name="username"
                          label="Username"
                          v-model="User.username"
                          type="text"
                          
                          :style="{display: isDisplay ? 'none' : ''}"
                          
                      ></v-text-field>
                      <v-text-field
                          name="email"
                          label="E-mail"
                          v-model="User.email"
                          type="email"
                                                  
                      ></v-text-field>
                      <v-text-field
                          name="address"
                          label="Address"
                          v-model="User.address"
                                                    
                      ></v-text-field>
                      <v-text-field
                          name="gender"
                          label="Gender"
                          v-model="User.gender"
                                                   
                      ></v-text-field>                      
                      <template>
                        <label for="phone">Phone Number</label>
                        <vue-tel-input 
                          name="phone" 
                          :value="User.phone"
                          defaultCountry="NG"
                          enabledCountryCode
                          >
                          <!-- <template v-slot:arrow-icon>
                           <v-icon>arrow_drop_down</v-icon>
                           <strong>+{{countryCode}}</strong>
                          </template> -->
                        </vue-tel-input>
                      </template>
                      <v-text-field
                          name="organisation"
                          label="Organisation"
                          v-model="User.organisation"
                          
                      ></v-text-field>
                      <v-textarea
                          label="Biography"
                          :value="User.biography"
                          name="biography"  
                      >
                      </v-textarea>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="blue--text text--darken-3" type="submit">Update</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
                </v-tab-item>

                <v-tab-item
                  reverse-transition="tab-reverse-transition"
                  transition="tab-transition"
                >
                  <v-container grid-list-xs>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-card>
                          <v-card-text v-if="error">
                            <v-snackbar
                              color="warning"
                              v-model="value"
                              :timeout="3000"
                            >
                              Please check your current password!!!
                              <v-btn dark flat @click.native="value = false">Close</v-btn>
                            </v-snackbar>
                          </v-card-text>
                          <v-toolbar dense flat>
                            <v-toolbar-title><h3>Change Password</h3></v-toolbar-title>
                          </v-toolbar>

                          <v-card-text>
                            <form method="POST">
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
                                    v-model="newPswd"
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
                                  <v-btn color="info" @click.native="onChangePassword">Update</v-btn>
                                </v-flex>
                              </v-layout>
                            </form>
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
            isDisplay: true,
            type: false,
            currentPswd: '',
            comfirmPswd: '',
            newPswd: '',
            countryCode: null,
            myImage: null,
            value: false,
        }
    },


    methods: {
      onSubmitData() {
        const myFormData = new FormData(this.$refs.myForm)
        return this.$store.dispatch('updateUserDetail', myFormData);
      },

      onChangePassword() {
        return this.$store.dispatch('changePassword', {
          password: this.currentPswd,
          newPassword: this.newPswd
        })
      },

      onClicked() {
        return this.$refs.the_image.click()
      },

      onPicked(event) {
          const file = event.target.files[0]
          this.userInfo.profileImage = file
          const image = this.userInfo.profileImage.name

            if (image.lastIndexOf('.') <= 0) {
              alert ('Please pick a valid image')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
              this.myImage = fileReader.result
          })
          fileReader.readAsDataURL(this.userInfo.profileImage)
          this.profileImage = null
      },
      countrySelected(val) {
        this.countryCode = val.dialCode
      }
    },

    computed: {
      User() {
        return this.$store.getters.getUser
      },

      comparePswd() {
        return (this.newPswd === this.comfirmPswd) ? '' : "Please the password does not match"
      },

      error() {
        return this.$store.getters.error
      }
    }

}
</script>

<style scoped>

</style>