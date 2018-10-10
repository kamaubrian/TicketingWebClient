import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Schedule from '@/components/Schedule/Schedule'
import Login from '@/components/auth/Login'
import Payments from '@/components/transactions/Payments'

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
      component:Schedule
    },
    {
      path:'/payments',
      name:'Payments',
      component:Payments
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    }
  ],mode:'history'
})
