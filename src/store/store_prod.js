import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'
import {mapActions } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    // apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
      // apiUrl: 'http://192.168.110.45:4000',
    apiUrl: 'http://beta.uranus.io:4000/',
    imageServerUrl: 'http://beta.uranus.io:3300/rancher-img/',
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
    curRole: '',
    defaultPageSize: 20,
    defaultCardPageSize: 20,
    refreshDuration: 5
  },
  getters: {
    lang: function (state) {
      return state.lang[state.curLang]
    }
  },
  mutations: {
    authenticate: function (state, user) {
      state.isLoggedIn = auth.isLoggedIn()
    },
    setLang: function(state, lang) {
      state.curLang = lang
    }
  },
  actions: {
    authenticate: function (context, user) {
      context.commit('authenticate', user)
    },
    setLang: function(context, lang) {
      context.commit('setLang', lang)
    }
  }
})
