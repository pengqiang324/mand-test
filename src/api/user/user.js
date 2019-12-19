import request from '@/libs/request'
import qs from 'qs'
const api = '/api'

// export function login(data) {
//     return request({
//         url: '/user/login',
//         method: 'post',
//         data
//     })
// }

// 登录注册
export function login(data) {
    return request({ 
        url: `${api}/authentication/login`,
        method: 'post',
        data: qs.stringify(data) 
    })
}


export function getInfo(token) {
    return request({
        url: `${api}/user/info`,
        method: 'get',
        params: { token }
    })
}

// 获取微信用户信息
export function getUserWxInfo({ code }) {
    return request({
        url:   `${api}/wx/getAccessToken/${code}`,
        method: 'get'
    })
}

// 刷新用户信息
export function refreshUserInfo(params) {
    return request({
        url: `${api}/users/getInfo`,
        method: 'get',
        params 
    })
}