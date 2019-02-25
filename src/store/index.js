import Vue from 'vue'
import Vuex from 'vuex'
import state from './member/state'
import actions from './member/actions'
import mutations from './member/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations
})
