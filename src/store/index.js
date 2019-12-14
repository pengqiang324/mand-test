import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: false,
    showNetwork: false,
    isShowError: true,
    
  },

  mutations: {
    updateLoading(state, showLoading) {
      state.showLoading = showLoading
    },

    updateNetwork(state, {isShowError, showNetwork}) {
      state.isShowError = isShowError
      state.showNetwork = showNetwork
    },
  },

  actions: {
  },

  modules: {
  }
})
