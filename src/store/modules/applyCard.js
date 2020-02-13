import { sendValidCode } from '@/api/applyCard/applyCard'
const state = {
    isGetInfo: false
}

const mutations = {
    // 更新是否刷新用户信息
    REFRESH_INFO_STATUS: (state, payload) => {
        state.isGetInfo = payload
    }
}

const actions = {
    // 发送验证码
    validCodeSend(_, { payload }) {
        return sendValidCode(payload)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}