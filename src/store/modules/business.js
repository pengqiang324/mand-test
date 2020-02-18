
const state = {
    isRefreshBusinessInfo: false
}

const mutations = {
    // 更新是否刷新商学院列表
    REFRESH_BUSINESS_INFO: (state, payload) => {
        state.isRefreshBusinessInfo = payload
    }
}

const actions = {
    REFRESH_BUSINESS_STATUS: ({ commit }, payload) => {
        commit('REFRESH_BUSINESS_INFO', payload)
        return Promise.resolve()
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}