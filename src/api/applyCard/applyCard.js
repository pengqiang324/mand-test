import request from '@/libs/request'
const api = '/api'

// 获取用户办理信用卡时回显信息
export function getApplyCardInfo() {
    return request({ 
        url: `${api}/users/getApplyCardInfo`,
        method: 'get',
    })
}

// 新世界免登录本人申请接口
export function nologin() {
    return request({ 
        url: `${api}/xinshijie/nologin`,
        method: 'post',
    })
}

// 他人申请信用卡短信验证码获取
export function sendValidCode(data) {
    return request({ 
        url: `${api}/sendSms/sendCreditCardValidCode`,
        method: 'post',
        data
    })
}

// 姓名和身份证身份校验
export function nameAndCardNoAuth(data) {
    return request({ 
        url: `${api}/user/nameAndCardNoAuth`,
        method: 'post',
        data
    })
}

// 新世界用户帮他人申请办卡免登录接口
export function applyForOthers(data) {
    return request({ 
        url: `${api}/xinshijie/applyForOthers`,
        method: 'post',
        data
    })
}