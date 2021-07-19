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
            <router-link :to="`profile/${user.username}`" class="styleLink">Profile</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon> exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <span>Logout</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app fixed>
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-lg-only"
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
        <v-list>
          <v-list-group
            :value="false"
            prepend-icon="mdi-cog-outline"
          >
            <template v-slot:activator>
              <v-list-item-title>Settings</v-list-item-title>
            </template>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar
                  size="45"
                  contain
                >
                  <v-icon large>person</v-icon>
                </v-avatar>
                </v-list-item-avatar>
                <router-link :to="`profile/${user.username}`">
                  <v-list-item-content>
                    <v-list-item-subtitle class="subheading">my Profile</v-list-item-subtitle>
                  </v-list-item-content>
                </router-link>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                  <v-icon>exit_to_app</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle><button @click.prevent="logout">Logout</button></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
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
        {icon: 'class', title: 'Suggestion Box', toLink: '/suggestionbox'}, 
        {icon: 'question_answer', title: 'About Us', toLink: 'aboutus'}, 
        {icon: 'notifications', title: 'Notification', toLink: '/notification'}
      ]
    }
    return navList
    },
    
    userAuth (){
      return (this.$store.getters.login !== false && this.$store.getters.login !== undefined) 
    },

    Notification(){
      return this.$store.getters.sortedNotification.length
    },

    user() {
      return this.$store.getters.getUser
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