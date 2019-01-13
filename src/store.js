import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    // apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
      // apiUrl: 'http://192.168.110.45:4000',
    apiUrl: 'http://47.105.151.199:4000/',
    imageServerUrl: 'http://47.105.151.199:3300/rancher-img/',
    username: null,
    // userId: null,
    userId: 62,
    lang: {// 全部语言包列表
      'zh-cn': 'zh-cn',
      'en-us': 'en-us'
    },
    curlang: 'en-us' // 当前的语言包
  },
  getters: {
    lang: state => {
      return state.lang[state.curlang]
    }
  },
  mutations: {
    authenticate (state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
      } else {
        state.userId = null
        state.username = null
      }
    }
  },
  actions: {
    authenticate (context) {
      context.commit('authenticate')
    }
  }
})
