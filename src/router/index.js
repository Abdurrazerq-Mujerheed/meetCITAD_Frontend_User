import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import Events from '@/components/Events/Events'
import Event from '@/components/Events/Event'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import Reset from '@/components/User/ResetPassword'
import SignUp from '@/components/User/SignUp'
import AboutUs from '@/components/SubComponent/AboutUs'
import Notification from '@/components/SubComponent/Notification'
import SuggestionBox from '@/components/SubComponent/SuggestionBox'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/reset-password/:token',
    name: 'Reset-Password',
    props: true,
    component: Reset,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/events/:_id',
    name: 'Event',
    props: true,
    component: Event,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/suggestionbox',
    name: 'SuggestionBox',
    component: SuggestionBox,
    meta: {
      requireAuth: true
    }
  }
]

// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   let token = localStorage.getItem('UserToken')
//   let requiresAuth = to.matched.some(record => record.meta.requireAuth)
//   if(!token && requiresAuth) {
//     next('/signin')
//   }else {
//     next()
//   }
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
