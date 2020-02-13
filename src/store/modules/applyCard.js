const state = {
    isGetInfo: false
}

const mutations = {
    // 更新是否刷新用户信息
    REFRESH_INFO_STATUS: (state, payload) => {
        state.isGetInfo = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations
}