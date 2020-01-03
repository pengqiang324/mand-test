import request from '@/libs/request'
import qs from 'qs'
const api = '/api'

// 登录注册
export function login(data) {
    return request({ 
        url: `/authentication/login`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
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

// 获取短信验证码
export function validCodeSendUrl(data){
    return request({
        url: `${api}/sms/validCodeSend`,
        method: 'post',
        data
    })
}

// 校验验证码
export function validateSmsCode(data) {
    return request({
        url: `${api}/sms/validCode`,
        method: 'post',
        data
    })
}

// 用户注册
export function registe(data) {
    return request({
        url: `${api}/users/register`,
        method: 'post',
        data
    })
}

// 完善用户信息
export function perfectUserInfo(data) {
    return request({
        url: `${api}/user/identityAuthentication`,
        method: 'post',
        data
    })
}


// 清除缓存
export function logout() {
    return request({
        url: `/authentication/logout`,
        method: 'post'
    })
}

// 用户信息注册同步
export function synchroinfo() {
    return request({
        url: `${api}/cardkeeper/synchroinfo`,
        method: 'post'
    })
}