import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Schedule from '@/components/Schedule/Schedule'
import Login from '@/components/auth/Login'
import Payments from '@/components/transactions/Payments'
import Customers from '@/components/users/Users'
import Profile from '@/components/users/Profile'
import Bus from '@/components/bus/Bus'
import auth from './auth-guard'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component:Login
    },
    {
      path:'/schedule',
      name:'Schedule',
      component:Schedule,
      beforeEnter:auth
    },
    {
      path:'/payments',
      name:'Payments',
      component:Payments,
      beforeEnter:auth
    },
    {
      path:'/home-dash',
      name:'Home',
      component:Home,
      beforeEnter:auth
    },
    {
      path:'/customers',
      name:'Customers',
      component:Customers,
      beforeEnter:auth
    },
    {
      path:'/admin-profile',
      name:'Profile',
      component:Profile,
      beforeEnter:auth
    },
    {
      path:'/bus-check',
      name:'Bus',
      component:Bus,
      beforeEnter:auth
    }
  ],mode:'history'
})
