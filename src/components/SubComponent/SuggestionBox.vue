<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container grid-list-xs>
            <v-form>
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
              <v-card-actions justify-center>
                  <v-btn color="primary" @click="sendComment">Send</v-btn>
              </v-card-actions>
            </v-form>
            <v-layout row wrap>
              <v-btn color="primary" @click="dialog = true">Sent Comment</v-btn>
            </v-layout>
            <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="700">
                <v-card>
                  <v-toolbar color="primary" dark>
                    <v-card-title class="headline">Comments</v-card-title>
                  </v-toolbar>
                  <v-card-text>
                    <table>
                      <tr v-for="(comment, index) in suggestions" :key="index">
                        <td> {{ index+=1 }} </td>
                        <td>{{ comment.email }}</td>
                        <td>{{ comment.comment }}</td>
                        <td>{{ comment.date | formatDate}}</td>
                      </tr>
                    </table>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click.native="dialog = false">Done</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
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
        comments: {},
        dialog: false
    }),


    computed: {
      suggestions() {
        return this.$store.getters.getComments
      }
    },

    methods: {
        sendComment() {
            this.$store.dispatch('postSuggestion', this.comments )
            
            this.comments.email = ''
            this.comments.suggestion = ''
            this.$store.dispatch('getSuggestions')
        }
    }
}
</script>