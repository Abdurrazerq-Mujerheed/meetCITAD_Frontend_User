<template>
    <v-container>
        <h1>Notification Section</h1>
        <p v-if="Notifications">You have some events you need to attend so far...</p>
        <p v-else-if="!Notifications">No Event to be attended so far....</p>
        <p class="text-center">
            <v-progress-circular indeterminate color="primary"
            :size="50"
            disabled 
            ></v-progress-circular>
        </p>
        <v-divider inset></v-divider>
        <v-layout row wrap v-for="notification of Notifications" :key="notification.date" pa-3 mb-2>
            <v-flex xs6 sm6 text-left>
               <p><strong> {{ notification.title }} </strong></p>
               <v-subheader>{{ notification.description }}</v-subheader>
            </v-flex>
            <v-flex xs4 sm4 text-left>
               <p> {{ notification.date }} </p>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
export default {
    name: 'Notification',
    data: () => ({

    }),

    created() {
        return this.$store.dispatch('fetchRegisteredEvents')
    },
    
    computed: {
        Notifications (){
            return this.$store.getters.sortedNotification
        },

        load() {
            return this.$store.getters.loading
        }
    },

    methods: {

    }
}
</script>