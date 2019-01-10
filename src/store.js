import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    // apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
    apiUrl: 'http://192.168.110.45:4000',
    // apiUrl: 'http://47.105.151.199:4000/',
    username: null,
    userId: null,
    HashPowerStatus: {
      notAdd: '未加入算力池',
      normal: '正常状态',
      waiting: '等待状态'
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
