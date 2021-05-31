<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-container grid-list-xs>
                        <v-form>
                            <v-card-text>
                                <v-text-field
                                    name="emial"
                                    label="E-mail"
                                ></v-text-field>
                                <v-textarea
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    label="Word of Advice or suggestion"

                                ></v-textarea>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="success">Send</v-btn>
                            </v-card-actions>
                        </v-form>
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
        suggestion: '',
        email: ''
    }),
}
</script>