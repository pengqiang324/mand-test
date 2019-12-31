import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: true,  // 是否显示加载组件
    showNetwork: false,  // 是否显示网络连接出错组件
    showErrorInfo: false, // 是否显示错误反馈信息组件
    showDiaLog: false,
    showError: false,
    hideAppLoading: false,  // 隐藏app.vue中的全局loading
    errorMessage: ''      // 错误反馈信息描述
  },

  mutations: {
    updateLoading(state, showLoading) {
      state.showLoading = showLoading
    },

    updateNetwork(state, showNetwork) {
      state.showNetwork = showNetwork
    },

    updateErrorInfo(state, { showErrorInfo, errorMessage }) {
      state.showErrorInfo = showErrorInfo
      if (errorMessage) state.errorMessage = errorMessage
    },

    updateShowDiaLog(state, showDiaLog) {
      state.showDiaLog = showDiaLog
    },

    updateHideAppLoading(state, hideAppLoading) {
      state.hideAppLoading = hideAppLoading
    },

    updateShowError(state, showError) {
      state.showError = showError
    }
  },

  actions: {
    showDiaLog({ commit }, payload) {
      commit('updateShowDiaLog', payload)
    },

    hideAppLoading({ commit }, payload) {
      commit('updateHideAppLoading', payload)
    }
  },

  modules: {
    user
  }
})
