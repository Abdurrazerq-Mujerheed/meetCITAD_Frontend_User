<template>
  <v-container grid-list-xs>
    <div v-if="message">
      <v-alert type="success" dismissible dense outlined text>
        {{ message }}
      </v-alert>
    </div>
    <div v-if="error">
      <v-alert type="error" dismissible dense outlined text>
        {{ error }}
      </v-alert>
    </div>

    <v-tabs
      v-model="value"
      color="primary"
      centered
      slider-color="primary"
    >
    <v-tabs-slider></v-tabs-slider>
      <v-tab>
        <v-icon medium left>mdi-send</v-icon>
        Compose
      </v-tab>
      <v-tab>
        <v-icon medium left>mdi-message</v-icon>
        Sent
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="value">
      <v-tab-item>
        <v-card>
          <v-container grid-list-xs>
            <v-form>
              <v-card-text>
                <v-text-field
                    name="email"
                    label="E-mail"
                    v-model.trim="comments.email"
                    required
                ></v-text-field>
                <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Word of Advice or suggestion"
                    v-model="comments.suggestion"
                ></v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text class="text-center">
                  <v-btn color="primary" @click="sendComment">Send</v-btn>
              </v-card-text>
            </v-form>
          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-card-title class="headline">Comments</v-card-title>
          </v-toolbar>
          <v-card-text>
            <v-simple-table style="width:100%" border="1px">
              <tbody>
                <tr v-for="(comment, index) in suggestions" :key="index">
                <td style="width: 3px"> {{ index+=1 }} </td>
                <td>{{ comment.email }}</td>
                <td>{{ comment.comment }}</td>
                <td>{{ comment.date | formatDate}}</td>
              </tr>
              </tbody>
              <tfoot>
                <td colspan="4" class="text-center text--disabled"><i>myComments, myAdvice as well as mySuggestion</i></td>
              </tfoot>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
    name: 'SuggestionBox',
    data: ()=> ({
        comments: {},
        value: null
    }),

    mounted() {
      this.$store.dispatch('getSuggestions')
    },

    computed: {
      suggestions() {
        return this.$store.getters.getComments
      },
      message() {
        return this.$store.getters.message
      }, 
      error() {
        return this.$store.getters.error
      }
    },

    methods: {
        sendComment() {
          if (this.comments.email == "" || this.comments.suggestion){
            return alert("Please fill in all the fields")
          }
            this.$store.dispatch('postSuggestion', this.comments )
            
            this.comments.email = ''
            this.comments.suggestion = ''
            this.$store.dispatch('getSuggestions')
        }
    }
}
</script>