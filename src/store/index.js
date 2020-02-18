import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import shopOwner from './modules/shopOwner'
import applyCard from './modules/applyCard'
import business from './modules/business'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    keepAlive: state => state.keepAlive
  },

  state: {
    showLoading: true,  // 是否显示加载组件
    showNetwork: false,  // 是否显示网络连接出错组件
    showErrorInfo: false, // 是否显示错误反馈信息组件
    showDiaLog: false,
    showError: false,
    hideAppLoading: false,  // 隐藏app.vue中的全局loading
    showErrorLogin: false,  //  初始进公众号时返回系统繁忙，错误异常显示
    errorMessage: '',      // 错误反馈信息描述
    keepAlive: [],  // 缓存组件
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
    },

    updateShowErrorLogin(state, showErrorLogin) {
      state.showErrorLogin = showErrorLogin
    },

    SET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive.push(keepAlive)
    },

    RESET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive = keepAlive
    }
  },

  actions: {
    showDiaLog({ commit }, payload) {
      commit('updateShowDiaLog', payload)
    },

    hideAppLoading({ commit }, payload) {
      commit('updateHideAppLoading', payload)
    },

    showErrorLogin({ commit }, payload) {
      commit('updateShowErrorLogin', payload)
    }
  },

  modules: {
    user,
    shopOwner,
    applyCard,
    business
  }
})
