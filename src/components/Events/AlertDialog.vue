<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            large
          >
            {{ userRegister ? 'Unregister' : "Register" }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title v-if="!userRegister">
            <span class="headline">Register for Event</span>
          </v-card-title>
          <v-card-title v-if="userRegister">
            <span class="headline">Unregister for Event</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap justify-center>
                <v-flex>
                  <div v-if="userRegister">
                    <v-card-text>
                      Do you really want to Unregister the event?
                    </v-card-text>
                  </div>
                  <div v-else>
                    <v-card-text>
                      Do you want to Register for this event?
                    </v-card-text>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined text @click.native="dialog = false">Close</v-btn>
            <v-btn color="primary" outlined text @click.native="onConfirm">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
//import moment from 'moment'

export default {
  props: ['eventId'],

  data: () => ({
    dialog: false
  }),
  computed: {
    userRegister() {
      return (this.$store.getters.getUser.registeredEvent).findIndex(ev => ev == this.eventId) >= 0
    },
     eventDate (){
      return this.$store.getters.singleEvent(this.eventId).date
    },
    // checkMe() {
    //     return moment().isAfter(this.events.date)
    // }
  },

  methods: {
    onConfirm() {
      let data = {
          userId: this.$store.getters.getUser._id,
          eventID: this.eventId 
      }
      if(!this.userRegister){
        this.$store.dispatch('registerEvent', data)
      }else {
        this.$store.dispatch('unregisterEvent', data)
      }
      this.dialog = false
    }

  }
}
</script>
<style>
  
</style>