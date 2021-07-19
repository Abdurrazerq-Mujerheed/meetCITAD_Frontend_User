<template>
    <v-container>
        <v-layout row wrap xs12 offset-sm3 class="mt-4">
            <v-flex xs12>
                <v-card>
                    <v-row>
                        <v-col cols="5" xs5 sm6>
                            <v-card>
                                <v-img
                                    :src="`http://localhost:3030/${events.eventImage}`"
                                    height="400px"
                                    width="auto"
                                    fill-height
                                    position="center"
                                    :alt="events.title"
                                ></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="7" xs7 sm6>
                            <v-card-text height="auto">
                                <v-card-title x-large>{{ events.title }}</v-card-title>
                                <p style="display: inline-block">Description <br> {{ events.description }}</p>
                            </v-card-text>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="" class="text-left ml-7 mb-4">
                           <v-card-text>
                               <v-layout row wrap>
                                   <v-flex xs8>
                                        <div>Date: {{ events.date | formatDate}}</div>
                                        <div>Time: {{ events.time }}</div>
                                        <div>Venue: {{ events.venue }}</div>
                                   </v-flex>
                                   <v-flex xs4 align-self-end class="text-left">
                                        <div>Host by: {{ events.hostBy }}</div>
                                   </v-flex>
                               </v-layout>
                           </v-card-text> 
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" class="mt-3 align-center">
                            <v-card-actions>
                                <v-layout row wrap>
                                    <v-flex xs6 class="text-right pr-3">
                                        <v-btn color="primary" large @click="back">Cancel</v-btn>
                                    </v-flex>
                                    <v-flex xs6 class="text-left pl-3 mt-3">
                                        <template>
                                            <alert-dialog :eventId="events._id"></alert-dialog>
                                        </template>
                                    </v-flex>
                                </v-layout>  
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import AlertDialog from './AlertDialog.vue'
export default {
    props: ['_id'],
    data(){
        return {
            
        }
    },
    
    components:{
        AlertDialog
    },

    computed: {
        events (){
            return this.$store.getters.singleEvent(this._id)
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    },
}
</script>