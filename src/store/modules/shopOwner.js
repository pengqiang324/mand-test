const state = {
    status: 0,
    redirect_url: ''
}

const mutations = {
    // 重定向地址
    SETURL: (state, payload) => {
        state.redirect_url = payload
    },
    // 用户状态（是否为店主）
    SAVESTATUS: (state, payload) => {
        state.status = payload
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