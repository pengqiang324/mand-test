import { getUserWxInfo, login, refreshUserInfo } from '@/api/user/user'

const state = {
    userInfo: {},
    isLogin:false,
    userWxInfo: {}
}

const mutations = {
    SAVEUSERINFO: (state, { data }) => {
        state.userInfo = data;
    },

    SAVEUSERWXINFO: (state, { data }) => {
        state.userWxInfo = data;
    },
}

const actions = {
    // 用户登录信息
    async login({ commit }, { payload }) {
        const response = await login(payload);
        commit('SAVEUSERINFO', response.data);
        commit('ISLOGIN', true);
        localStorage.setItem('token', response ? response.data.data.token : '');
        localStorage.setItem('userInfo', response ? JSON.stringify(response.data.data) : '');
        localStorage.setItem('loginState', 'isLogin');
        return response
    },
    
    // 获取微信用户信息
    async getUserWxInfo({ commit }, { payload }) {
        const response = await getUserWxInfo(payload);
        commit('SAVEUSERWXINFO', response.data);
        localStorage.setItem('userWxInfo', response.data ? JSON.stringify(response.data.data) : '');
        return response
    },

    // 刷新用户信息
    async refreshUserInfo({ commit }) {
        const response = await refreshUserInfo();
        commit('SAVEUSERINFO', response.data);
        localStorage.setItem('userInfo', response.data ? JSON.stringify(response.data.data) : '');
        return response;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}