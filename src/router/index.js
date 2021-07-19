import Vue from 'vue'
import VueRouter from 'vue-router'

import Authenticated from './route-guard'
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
    beforeEnter: Authenticated
  },
  {
    path: '/reset-password/:token',
    name: 'Reset-Password',
    props: true,
    component: Reset
  },
  {
    path: '/events/:_id',
    name: 'Event',
    props: true,
    component: Event,
    beforeEnter: Authenticated
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
    beforeEnter: Authenticated
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
    beforeEnter: Authenticated
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
    beforeEnter: Authenticated
  },
  {
    path: '/suggestionbox',
    name: 'SuggestionBox',
    component: SuggestionBox,
    beforeEnter: Authenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
