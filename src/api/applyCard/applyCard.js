import request from '@/libs/request'
const api = '/api'

// 获取用户办理信用卡时回显信息
export function getApplyCardInfo() {
    return request({ 
        url: `${api}/users/getApplyCardInfo`,
        method: 'get',
    })
}