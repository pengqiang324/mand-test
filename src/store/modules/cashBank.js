const state = {
    isRefreshBankInfo: false
}

const mutations = {
    // 更新是否刷新银行列表
    REFRESH_BANK_INFO: (state, payload) => {
        state.isRefreshBankInfo = payload
    }
}

const actions = {
    // 刷新银行列表
    refresh_bank_info({ commit }, payload) {
        commit('REFRESH_BANK_INFO', payload)
        return Promise.resolve()
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}