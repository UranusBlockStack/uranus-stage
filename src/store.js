import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'
import {mapActions } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    // apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
      // apiUrl: 'http://192.168.110.45:4000',
    apiUrl: 'http://47.105.151.199:4000/',
    imageServerUrl: 'http://47.105.151.199:3300/rancher-img/',
    userName: '8613716252314',
    userId: '60',
    lang: {// 全部语言包列表
      'zh-cn': 'zh-cn',
      'en-us': 'en-us'
    },
    curLang: 'en-us', // 当前的语言包
      userRoles: {
          1: 'seller',
          2: 'buyer',
          3: 'developer'
      },
      curRole: ''
  },
  getters: {
    lang: state => {
      return state.lang[state.curLang]
    }
  },
  mutations: {
    authenticate (state, user) {
      state.isLoggedIn = auth.isLoggedIn()

      if (state.isLoggedIn) {
        state.userName = auth.getUsername()
        state.userId = auth.getUserId()

          if(!state.userName)
              state.userName=user.userName
          if(!state.userId)
              state.userId = user.userId
        console.log(state.userName, state.userId)
      } else {
        state.userId = null
        state.userName = null
      }

    },
      setLang(state, lang) {
        state.curLang = lang
      },
      setRole(state, role) {
        state.curRole = role
      }
  },
  actions: {
    authenticate (context, user) {
      context.commit('authenticate', user)
    },
      setLang(context, lang){
        context.commit('setLang', lang)
      },
      setRole(context, role){
        context.commit('setRole', role)
      }
  }
})
