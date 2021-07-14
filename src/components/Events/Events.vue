<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="mb-5" width="100%">
                    <v-text-field 
                    append-icon="search" 
                    hide-details 
                    single-line
                    v-model="searchByTitle" 
                    placeholder="Search an event by title..."
                    ></v-text-field>
                </v-card>
            </v-flex>
        </v-layout>
          <v-layout row wrap  color="blue--text" v-for="event in filteredEvent" :key="event._id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card>
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card height="150" width="150">
                                    <v-img :src="`http://localhost:3030/${event.eventImage}`"
                                    height="100%" width="100%" alt="" srcset="" class="grey darken-4">
                                    </v-img>
                                </v-card>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title>
                                    <div>
                                        <h2 class="mb-0">{{event.title}}</h2>
                                        <div>{{event.date}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn color="primary" text :to="'/events/' + event._id">
                                        <v-icon left>arrow_forward</v-icon>
                                        View event
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Events',
    
    data() {
        return {
            searchByTitle: ''        
        }
    },

    computed: {
        filteredEvent (){
            return this.$store.getters.LoadEvents.filter((event) => {
                return event.title.match(this.searchByTitle)
            })
        }
    }
}
</script>