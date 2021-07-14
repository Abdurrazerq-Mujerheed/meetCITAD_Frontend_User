<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-container grid-list-xs>
                        <form method="POST" @submit="sendComment">
                            <v-card-text>
                                <v-text-field
                                    name="email"
                                    label="E-mail"
                                    v-model.trim="comments.email"
                                ></v-text-field>
                                <v-textarea
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    label="Word of Advice or suggestion"
                                    v-model="comments.suggestion"
                                ></v-textarea>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="primary" type="submit">Send</v-btn>
                            </v-card-actions>
                        </form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'SuggestionBox',
    data: ()=> ({
        comments: {}
    }),

    methods: {
        sendComment() {
            this.$store.dispatch('postSuggestion', this.comments )
            
            this.comments.email = ''
            this.comments.suggestion = ''
        }
    }
}
</script>