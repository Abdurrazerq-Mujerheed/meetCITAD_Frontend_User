export const mutations = {
  Login (state, payload) {
    state.UserLogin = payload
  },

  UserDetails (state, payload) {
    state.UserProfile = payload
  },

  Notification (state, payload) {
    state.RegisteredEvents = payload
  },

  AllEvent (state, payload) {
    state.EventList = payload
  },

  Comments (state, payload) {
    state.SuggestionBox = payload
  }
}