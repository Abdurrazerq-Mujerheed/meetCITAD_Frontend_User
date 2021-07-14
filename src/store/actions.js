import axios from 'axios'
import router from '@/router/index'

export const actions = {

  userSignIn ({ commit, dispatch }, payload) {
    let UserData = {
      ...payload
    }

    axios.post('user/login', UserData)
      .then((response => {
        commit('Login', true)
        commit('UserDetails', response.data.User)
        localStorage.setItem('UserToken', response.data.userToken)
        actions.fetchEvents()
        router.push('/')

      }))
      .catch(error => {
        console.log(error);
      })
  },

  userSignOut ({ commit }) {
    commit('Login', false)
    localStorage.clear()
    commit('UserDetails', null)
    commit('Notification', null)
    commit('AllEvent', null)
    commit('Comment', null)

    router.push('/signin')
  },

  userSignUp ({ commit }, payload) {
    const userData = {
      ...payload,

      registeredEvents: [],
      
      suggestionMsgs: []
    }

    axios.post('user/created-users', userData)
      .then(response => {
        console.log(response)
        //commit('UserDetails', response.data)
        router.push({name: 'SignIn'})
      })
      .catch(error => {
        console.log(error);
      })

  },

  fetchUserDetails ({ commit }, payload) {
    axios.get(`user/created-users/${payload}`)
      .then(response => {
        console.log(response)
        commit('UserDetail', response.data)
      })
      .catch(error => {
        console.log(error);
      })
  },

  fetchEvents ({ commit }) {
    axios.get('event/events')
      .then(response => {
        console.log(response);
        commit('AllEvent', response.data)
      })
      .catch(error => {
        console.log(error);
      })
  },

  updateUserDetail ({ commit }, payload) {
    let updatedData = {
      fullname: payload.fullname,
      username: payload.username,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      organisation: payload.organisation,
      biography: payload.biography,
      profilePic: payload.profile
    }
    let userId = { username: payload.username}

    axios.patch(`user/created-users/${userId}`, updatedData)
      .then(response => {
        console.log(response);
        commit('UserProfile', response.data)
      })
      .catch(error => {
        console.log(error);
      })
  },

  changePassword ({ commit }, payload) {
    let updatedPassword = {
      crtPassword: payload.crtPassword,
      newPassword: payload.newPassword
    }

    axios.patch(`user/created-users/${payload.username}/change-password`, updatedPassword)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  },

  postSuggestion ({ commit }, payload) {
    let message = {
      email: payload.email,
      comment: payload.suggestion
    }

    axios.post(`user/suggestions`, message)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  },

  getSuggestions ({ commit }) {
    axios.get('user/suggestions')
      .then(response => {
        console.log(response);
        commit('Comments', response.data)
      })
      .catch(error => {
        console.log(error);
      })
  },

  resetPassword ({ commit }, payload) {
    
    axios.post('user/reset-pswd', payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  },

  newPassword ({ commit }, payload) {
    let password = {password: payload.password}
    
    axios.post(`user/reset-pswd/${payload.token}`, password)
      .then(response => {
        console.log(response);
        router.push('/signin')
      })
      .catch(error => {
        console.log(error);
      })
  },

  registerEvent ({ commit }, payload) {
    let userId = {userId: payload.userId}
    
    axios.post(`user/registered-event/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      
    axios.post(`admin/registered-users/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  },

  unregisterEvent ({ commit }, payload) {
    let userId = {userId: payload.userId}
    
    axios.post(`user/unregistered-event/${payload.eventID}`, userId)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  },

  fetchRegisteredEvents({ commit }, payload) {
    axios.get(`user/registered-event?userId=${payload.userID}`)
      .then(response => {
        console.log(response);
        commit('Notification', response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  
}