import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showResult: false,
    showNetwork: false,
  },

  mutations: {
    updateResult(state, showResult) {
      state.showResult = showResult
    },

    updateComponent(state, componentName) {
      state.componentName = componentName
    },

    updateNetwork(state, showNetwork) {
      state.showNetwork = showNetwork
    }
  },

  actions: {
  },

  modules: {
  }
})
