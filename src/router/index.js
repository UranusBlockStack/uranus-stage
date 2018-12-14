import Vue from 'vue'
import Router from 'vue-router'
import Starter from '@/components/starter'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPwd from '@/components/ForgetPwd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Starter',
      component: Starter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    }
  ]
})
