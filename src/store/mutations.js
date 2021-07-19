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

  registerEvent (state, payload) {
    if (state.UserProfile.registeredEvent.findIndex(event => event._id === payload ) >= 0) {
      return
    }else {
      state.UserProfile.registeredEvent.push(payload)
    }
  },

  unregisterEvent (state, payload) {
    let RegisteredEvents = state.UserProfile.registeredEvent
    RegisteredEvents.splice(RegisteredEvents.findIndex(event => event._id === payload ), 1)
  },

  Comments (state, payload) {
    state.SuggestionBox = payload
  },

  message (state, payload) {
    state.Message = payload
  },

  errorMessage (state, payload) {
    state.Error = payload
  },

  clear(state) {
    state.Message = ''
    state.Error = ''
  },

  loading (state, payload) {
    state.Loading = payload
  }
}