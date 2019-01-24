// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import VueI18n from 'vue-i18n'
import i18n from './i18n/i18n'
import echarts from 'echarts'
import ElementUI from 'element-ui'
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

import store from './store/store'
import * as auth from './services/AuthService'

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(ElementUI, { locale })

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

var router = new VueRouter({
  routes,
  mode: 'history'
})

/// jump1 登录、注册、Map页已登录控制
/// jump2 未登录自动跳转到map页
/// jump3 部分页面，如重置密码，直接放行

router.beforeEach(function (to, from, next) {
  const nextRoute = ['/', '/login', '/register']
  const thruRoute = ['/forgetPwd']

  if (thruRoute.indexOf(to.path) >= 0) {  // 直接放行页
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
                console.log('token refreshed')
              })
        }
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
