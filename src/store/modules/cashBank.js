const state = {
    levelUrl: '',
    isRefreshBankInfo: false,
    isTakeVuexState: false,
    bankInfo: {},
}

const mutations = {
    // 更新是否刷新银行列表
    REFRESH_BANK_INFO: (state, payload) => {
        state.isRefreshBankInfo = payload
    },

    UPDATE_BANK_INFO: (state, payload) => {
        state.isTakeVuexState = payload.isUpdate
        state.bankInfo = payload.bankInfo
    },

    SET_LEVEL_URL: (state, payload) => {
        state.levelUrl = payload
    }
}

const actions = {
    // 刷新银行列表
    refresh_bank_info({ commit }, payload) {
        commit('REFRESH_BANK_INFO', payload)
        return Promise.resolve()
    },

    // 更新新增银行信息
    update_bank_info({ commit }, payload) {
        commit('UPDATE_BANK_INFO', payload)
        return Promise.resolve()
    },

    set_level_url({ commit }, payload) {
        commit('SET_LEVEL_URL', payload)
        return Promise.resolve()
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}