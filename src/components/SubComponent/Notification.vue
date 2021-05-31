<template>
    <v-container>
        <h1>Notification Section</h1>
        <p>You have some events you need to attend so far</p>
        <v-layout row wrap v-for="notification of Notifications" :key="notification.date" pa-3 mb-2>
            <v-flex xs6 sm6>
               <p> {{ notification.title }} </p>
            </v-flex>
            <v-flex xs4 sm4>
               <p> {{ notification.date }} </p>
            </v-flex>
            <v-flex xs2 sm2>
               <p> <v-icon>mdi-delete</v-icon> </p>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
export default {
    name: 'Notification',
    data: () => ({

    }),
    
    computed: {
        Notifications (){
            return this.$store.getters.sortedEventNotification
        }
    },

    methods: {

    }
}
</script>