import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import Events from '@/components/Events/Events'
import Event from '@/components/Events/Event'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
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
    component: Events
  },
  {
    path: '/events/:_id',
    name: 'Event',
    props: true,
    component: Event
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
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
    component: Notification
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/suggestionbox',
    name: 'SuggestionBox',
    component: SuggestionBox
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
