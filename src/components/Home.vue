<template>
    <div>
        <template v-if="!userAuth">
            <Welcome />
        </template>
        <template v-if="userAuth">
        <v-container grid-list-lg >
            <v-layout row wrap mt-4>
            <v-flex class="text-sm-center">
                <p class="display-3">Welcome back {{ user.fullname }} </p>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs-12 sm6 class="text-xs-center text-sm-right">
                <v-btn color="info" large to="/events">Explore CITAD's Events</v-btn>
            </v-flex>
            <v-flex xs-12 sm6 class="text-xs-center text-sm-left">
                <v-btn color="info" width="230px" large to="/aboutus">About CITAD</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-card-text class="text-center">
                <v-progress-circular 
                    :width="8" 
                    :size="100" 
                    color="primary" 
                    indeterminate
                    v-if="loading"
                ></v-progress-circular>
            </v-card-text>

            <v-flex xs-12>
                <v-carousel>
                    <v-carousel-item
                        v-for="event in events"
                        :src="`http://localhost:3030/${event.eventImage}`"
                        :key="event._id"
                        @click="onLoadEvent(event._id)"
                    >
                    <div class="title">
                        {{ event.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>    
    </template>
        
    </div>
</template>

<script>
import Welcome from '@/views/Welcome.vue'

export default {
    name: 'Home',
    data (){
        return {
            
        }
    },
    
    methods: {
        onLoadEvent(id) {
            this.$router.push('/events/' + id)
        }
    },
    
    computed: {
        events (){
            return this.$store.getters.featuredEvent
        },

        userAuth (){
            return this.$store.getters.login == true 
        },
        
        user(){
            return this.$store.getters.getUser
        },

        loading() {
            return this.$store.getters.loading
        }
    },
    
    components: {
        Welcome
    }
}
</script>

<style scoped>
.title {
    position: absolute;
    bottom: 50px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2em;
    margin-left: 500px;
}
</style>