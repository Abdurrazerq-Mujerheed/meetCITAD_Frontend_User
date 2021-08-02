 <template>
  <nav>
    <!-- Navigational Drawer -->
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-item v-for="item in navList" :key="item.title">
          <v-list-item-icon>
            <v-icon> {{ item.icon}} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="item.toLink" class="styleLink">{{ item.title }}</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon> person </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="`profile/${user}`" class="styleLink">Profile</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon> exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <span style="cursor: pointer; color: skyblue" @click.prevent="logout">Logout</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app fixed>
      <v-app-bar-nav-icon
        @click.native="sideNav = !sideNav"
        class="hidden-sm-and-up"
        v-if="userAuth"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>
        <router-link to="/" class="styleLink">meetCITAD</router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>
      
      <v-toolbar-items class="hidden-xs-only" v-for="item in navList" :key="item.title">
          <v-btn v-if="item.title == 'Notification'" text class="text-capitalize blue--text" :to="item.toLink">
            <v-badge overlap bordered>
              <template v-slot:badge>
                <span class="gray--text"> {{ Notification }} </span>
              </template>
                <v-icon left medium>{{ item.icon }}</v-icon>
            </v-badge>
              {{ item.title }}
          </v-btn>
        <v-btn v-else text class="text-capitalize blue--text" :to="item.toLink">
          <v-icon left medium>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="userAuth">
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            text
          >
          <v-icon left>mdi-cog-outline</v-icon>
            <span class="text-capitalize">Setting</span>
          <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list width="200">
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>person</v-icon>
                </v-list-item-icon>
                <router-link style="text-decoration: none" :to="`profile/${user}`">
                  <v-list-item-content>
                    <v-list-item-subtitle class="subheading">Profile</v-list-item-subtitle>
                  </v-list-item-content>
                </router-link>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                  <v-icon medium>exit_to_app</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle><button @click.prevent="logout">Logout</button></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-menu>
      </v-toolbar-items>
    </v-app-bar>

  </nav>

</template>

<script>

export default {
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    navList(){
      let navList = [
      {icon: 'face', title: 'SignIn', toLink: '/signin'}, 
      {icon: 'lock_open', title: 'SignUp', toLink: '/signup'}
    ]

    if (this.userAuth) {
      navList = [
        {icon: 'event', title: 'View Events', toLink: '/events'}, 
        {icon: 'mdi-comment', title: 'Suggestion Box', toLink: '/suggestionbox'}, 
        {icon: 'question_answer', title: 'About Us', toLink: 'aboutus'}, 
        {icon: 'notifications', title: 'Notification', toLink: '/notification'}
      ]
    }
    return navList
    },
    
    userAuth (){
      return (this.$store.getters.login === true) 
    },

    Notification(){
      return this.$store.getters.sortedNotification.length
    },

    user() {
      return this.$store.getters.getUser.username
    }
  },
  methods: {

    logout() {
      return this.$store.dispatch('userSignOut')
    }
  }
}
</script>

<style scoped>
  .styleLink {
    text-decoration: none;
  }
  .active {
    border-left: 1px solid black;
  }
</style>