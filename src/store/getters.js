export const getters = {
  LoadEvents (state){
    return state.EventList.sort((eventA, eventB) => {
      return eventA.date > eventB.date
    })
  },
  
  featuredEvent (state, getters){
    return getters.LoadEvents.slice(0, 3)
  },
  
  singleEvent (state){
    return (eventId) => {
      return state.EventList.find((event) => {
        return event._id === eventId
      })
    }
  },
  
  sortedNotification (state){
    return state.RegisteredEvents.sort((eventA, eventB) => {
      return eventA.date > eventB.date
    })
  },
  
  getUser (state){
    return state.UserProfile
  },

  login(state) {
    return state.UserLogin
  },

  getComments (state) {
    return state.SuggestionBox
  },

  message(state) {
    return state.Message
  },

  error(state) {
    return state.Error
  },

  loading (state) {
    return state.Loading
  }
}