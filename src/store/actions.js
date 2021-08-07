import axios from 'axios'
import router from '@/router/index'

export const actions = {

  userSignIn ({ commit, dispatch }, payload) {
    commit('clear')
    commit('loading', true)
    let UserData = {
      ...payload
    }

    axios.post('user/login', UserData)
      .then((response => {
        commit('loading', false)
        commit('UserDetails', response.data.User)
        commit('message', response.data.message)
        localStorage.setItem('UserToken', response.data.userToken)
        dispatch('fetchEvents')
        setTimeout(() => {
          commit('Login', response.data.login)
          router.push('/')
        }, 2000);
      }))
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  userSignOut ({ commit, state }) {
    commit('Login', false)
    commit('clear')
    localStorage.clear()
    commit('UserDetails', [])
    state.UserProfile.username = 'someone'
    commit('Notification', [])
    commit('AllEvent', [])
    commit('Comment', [])
    router.push('/')
  },

  userSignUp ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    const userData = {
      ...payload,

      registeredEvents: [],
      
      suggestionMsgs: []
    }

    axios.post('user/created-users', userData)
      .then(response => {
        commit('message', response.data.message)
        commit('loading', false)
        router.push({name: 'SignIn'})
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })

  },

  fetchUserDetails ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    axios.get(`user/created-users/${payload}`)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        commit('UserDetails', response.data.User)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  fetchEvents ({ commit }) {
    commit('clear')
    commit('loading', true)
    
    axios.get('event/events')
      .then(response => {
        commit('loading', false)
        localStorage.setItem('tokenExpire', response.data.tokenExpiration)
        commit('message', response.data.message)
        commit('AllEvent', response.data.Events)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  updateUserDetail ({ commit, getters }, payload) {
    commit('clear')
    commit('loading', true)

    let userId = getters.getUser.username
 
    axios.patch(`user/created-users/${userId}`, payload)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        commit('UserDetails', response.data.updatedInfo)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  changePassword ({ commit, getters, dispatch }, payload) {
    commit('clear')
    commit('loading', true)

    let updatedPassword = {
      password: payload.password,
      newPassword: payload.newPassword
    }
    let username = getters.getUser.username

    axios.patch(`user/created-users/${username}/change-password`, updatedPassword)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        setTimeout(() => {
          dispatch('userSignOut')
        }, 2000);
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  postSuggestion ({ commit, getters }, payload) {
    commit('clear')
    commit('loading', true)

    let message = {
      email: payload.email,
      comment: payload.suggestion,
      userId: getters.getUser._id
    }

    axios.post(`user/suggestions`, message)
      .then(response => {
        commit('message', response.data.message)
        commit('loading', false)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  getSuggestions ({ commit, getters }) {
    commit('clear')
    commit('loading', true)
    let id = getters.getUser._id
    
    axios.get(`user/suggestions?userId=${id}`)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        commit('Comments', response.data.suggestionMessage)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  resetPassword ({ commit }, payload) {
    commit('clear')
    commit('loading', true)
    
    let mail = {email: payload}
    axios.post('user/reset-pswd', mail)
      .then(response => {
        commit('message', response.data.message)
        commit('loading', false)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  newPassword ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    let password = {password: payload.password}
    
    axios.post(`user/reset-pswd/${payload.token}`, password)
      .then(response => {
        commit('message', response.data.message)
        commit('loading', false)
        router.push({name: 'SignIn'})
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  registerEvent ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    let userId = {userId: payload.userId}
    
    axios.post(`user/registered-event/${payload.eventID}`, userId)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        commit('registerEvent', {eventId: payload.eventID})
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
    
     commit('clear')  
    axios.post(`admin/registered-users/${payload.eventID}`, userId)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  unregisterEvent ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    let userId = {userId: payload.userId}
    
    axios.post(`user/unregistered-event/${payload.eventID}`, userId)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        commit('unregisterEvent', {eventId: payload.eventID})
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
      commit('clear') 
      axios.post(`admin/unregistered-users/${payload.eventID}`, userId)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  },

  fetchRegisteredEvents({ commit, getters }) {
    commit('clear')
    commit('loading', true)

    let userID = getters.getUser._id

    axios.get(`user/registered-event?userId=${userID}`)
      .then(response => {
        commit('loading', false)
        commit('message', response.data.message)
        commit('Notification', response.data.registeredEvent)
      })
      .catch(error => {
        commit('loading', true)
        let bug = error.response.data.error
        commit('errorMessage', bug)
      })
  }

  
}