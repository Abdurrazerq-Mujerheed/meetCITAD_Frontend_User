<template>
    <div>
        <template v-if="!userAuthentication">
            <Welcome />
        </template>
        <template v-else>
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
            <v-flex xs-12>
                <v-carousel>
                    <v-carousel-item
                        v-for="event in events"
                        :src="event.imageUrl"
                        :key="event.id"
                        @click="onLoadEvent(event.id)"
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
        userAuthentication (){
            return (this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined) 
        },
        user(){
            return this.$store.getters.getUser
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