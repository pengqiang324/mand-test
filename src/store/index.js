import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showResult: false,
    componentName: 'ry-loading'
  },

  mutations: {
    updateResult(state, showResult) {
      state.showResult = showResult
    },

    updateComponent(state, componentName) {
      state.componentName = componentName
    }
  },

  actions: {
  },

  modules: {
  }
})
