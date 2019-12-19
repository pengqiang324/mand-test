import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: false,  // 是否显示加载组件
    showNetwork: false,  // 是否显示网络连接出错组件
    showErrorInfo: false, // 是否显示错误反馈信息组件
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
    }
  },

  actions: {
  },

  modules: {
    user
  }
})
