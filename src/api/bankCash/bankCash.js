import request from '@/libs/request'
const api = '/api'

// 获取银行卡列表
export function getByMemberId() {
    return request({ 
        url: `${api}/bank/getByMemberId`,
        method: 'get'
    })
}

// 获取银行卡列表
export function saveBank(data) {
    return request({ 
        url: `${api}/bank/saveBank`,
        method: 'post',
        data
    })
}
