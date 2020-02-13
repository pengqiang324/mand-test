const state = {
    status: 0,
    redirect_url: '',
    refreshUserInfo: false,
    refreshHomeStatus: false,
}

const mutations = {
    // 重定向地址
    SETURL: (state, payload) => {
        state.redirect_url = payload
    },
    // 用户状态（是否为店主）
    SAVESTATUS: (state, payload) => {
        state.status = payload
    },

    // 更新是否刷新用户信息
    REFRESH_USER_INFO: (state, payload) => {
        state.refreshUserInfo = payload
    },

    // 是否更新首页用户状态
    REFRESH_USER_STATUS: (state, payload) => {
        state.refreshHomeStatus = payload
    }
}

const actions = {
    updateURL: ({ commit }, payload) => {
        return new Promise((resolve) => {
            commit('SETURL', payload)
            resolve()
        })
    },

    updateStatus: ({ commit }, payload) => {
        commit('SAVESTATUS', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}