import request from '@/libs/request'
const api = '/api'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: `${api}/user/info`,
        method: 'get',
        params: { token }
    })
}