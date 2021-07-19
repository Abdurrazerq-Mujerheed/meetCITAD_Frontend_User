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
        commit('Login', response.data.login)
        commit('UserDetails', response.data.User)
        commit('message', response.data.message)
        localStorage.setItem('UserToken', response.data.userToken)
        dispatch('fetchEvents')
        router.push('/')
      }))
      .catch(error => {
        commit('loading', true)
        commit('errorMessage', error.reponse.data.error)
        console.log(error.reponse);
      })
  },

  userSignOut ({ commit }) {
    commit('Login', false)
    commit('clear')
    commit('UserDetails', null)
    commit('Notification', null)
    commit('AllEvent', null)
    commit('Comment', null)
    localStorage.clear()

    router.push('/signin')
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
        console.log(response)
        //commit('UserDetails', response.data)
        commit('loading', false)
        router.push({name: 'SignIn'})
      })
      .catch(error => {
        console.log(error)
        commit('loading', true)
        commit('errorMessage', error.data.message)
      })

  },

  fetchUserDetails ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    axios.get(`user/created-users/${payload}`)
      .then(response => {
        console.log(response)
        commit('loading', false)
        commit('UserDetails', response.data.User)
      })
      .catch(error => {
        console.log(error)
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  fetchEvents ({ commit }) {
    commit('clear')
    commit('loading', true)
    
    axios.get('event/events')
      .then(response => {
        commit('loading', false)
        localStorage.setItem('tokenExpire', response.data.tokenExpiration)
        commit('AllEvent', response.data.Events)
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  updateUserDetail ({ commit, getters }, payload) {
    commit('clear')
    commit('loading', true)

    let userId = getters.getUser.username
 
    axios.patch(`user/created-users/${userId}`, payload)
      .then(response => {
        console.log(response)
        commit('loading', false)
        commit('UserDetails', response.data.updatedInfo)
      })
      .catch(error => {
        console.log(error)
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  changePassword ({ commit, getters }, payload) {
    commit('clear')
    commit('loading', true)

    let updatedPassword = {
      password: payload.password,
      newPassword: payload.newPassword
    }
    let username = getters.getUser.username

    axios.patch(`user/created-users/${username}/change-password`, updatedPassword)
      .then(response => {
        console.log(response)
        commit('loading', false)
      })
      .catch(error => {
        console.log(error)
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
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
        console.log(response.data);
        commit('loading', false)
      })
      .catch(error => {
        console.log(error)
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  getSuggestions ({ commit, getters }) {
    commit('clear')
    commit('loading', true)
    let id = getters.getUser._id
    
    axios.get(`user/suggestions?userId=${id}`)
      .then(response => {
        console.log(response)
        commit('loading', false)
        commit('Comments', response.data.suggestionMessage)
      })
      .catch(error => {
        console.log(error)
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  resetPassword ({ commit }, payload) {
    commit('clear')
    commit('loading', true)
    
    let mail = {email: payload}
    axios.post('user/reset-pswd', mail)
      .then(response => {
        console.log(response)
        commit('loading', false)
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  newPassword ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    let password = {password: payload.password}
    
    axios.post(`user/reset-pswd/${payload.token}`, password)
      .then(response => {
        console.log(response);
        commit('loading', false)
        router.push('/signin')
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  registerEvent ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    let userId = {userId: payload.userId}
    
    axios.post(`user/registered-event/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
        commit('loading', false)
        commit('registerEvent', {eventId: payload.eventID})
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        //commit('errorMessage', error.response.data.error)
      })
      
    axios.post(`admin/registered-users/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
        commit('loading', false)
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  unregisterEvent ({ commit }, payload) {
    commit('clear')
    commit('loading', true)

    let userId = {userId: payload.userId}
    
    axios.post(`user/unregistered-event/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
        commit('loading', false)
        commit('unregisterEvent', {eventId: payload.eventID})
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })

      axios.post(`admin/unregistered-users/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
        commit('loading', false)
      })
      .catch(error => {
        console.log(error);
        commit('loading', true)
        commit('errorMessage', error.response.data.error)
      })
  },

  fetchRegisteredEvents({ commit, getters }) {
    commit('clear')
    commit('loading', true)

    let userID = getters.getUser._id

    axios.get(`user/registered-event?userId=${userID}`)
      .then(response => {
        commit('loading', false)
        console.log(response);
        commit('Notification', response.data.registeredEvent)
      })
      .catch(error => {
        commit('loading', true)
        console.log(error);
        commit('errorMessage', error.response.data.error)
      })
  }

  
}