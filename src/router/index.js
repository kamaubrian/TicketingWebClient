import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Schedule from '@/components/Schedule/Schedule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/schedule',
      name:'Schedule',
      component:Schedule
    }
  ],mode:'history'
})
