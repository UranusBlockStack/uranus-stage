import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import i18n from './i18n/i18n'
import ElementUI from 'element-ui'

import router from './router'
import store from './store/store'

import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './lib/jquery-vender.js'
import 'bootstrap'
import 'admin-lte'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'xterm/dist/xterm.css'

import * as auth from './services/AuthService'

// 注册路由
Vue.use(VueRouter)
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(ElementUI, { locale })

/// jump1 登录、注册、Map页已登录控制
/// jump2 未登录自动跳转到map页
/// jump3 部分页面，如重置密码，直接放行

router.beforeEach(function (to, from, next) {
  const nextRoute = ['/', '/login', '/register']
  const thruRoute = ['/forgetPwd']

  if (thruRoute.indexOf(to.path) >= 0) { // 直接放行页
    next()
  } else {
    const token = localStorage.getItem('token')

    if (nextRoute.indexOf(to.path) >= 0) { // 在角色自动跳转列表中的
      if (token == null || token === '') {
        next()
      } else {
        next({path: auth.getCurRole()})
      }
    } else {
      if (token == null || token === '') {
        next({path: '/'})
      } else {
        next()
        const tokenNeedRefresh = auth.tokenNeedUpdate()
        if (tokenNeedRefresh) {
          auth.refreshToken(auth.getCurLang())
            .then(newtoken => {
            })
        }
      }
    }
  }
})

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
});
