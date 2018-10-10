import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Schedule from '@/components/Schedule/Schedule'
import Login from '@/components/auth/Login'
import Payments from '@/components/transactions/Payments'
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
      path:'/home',
      name:'Home',
      component:Home,
      beforeEnter:auth
    }
  ],mode:'history'
})
