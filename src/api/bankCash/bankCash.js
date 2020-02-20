import request from '@/libs/request'
const api = '/api'

// 获取银行卡列表
export function getByMemberId() {
    return request({ 
        url: `${api}/bank/getByMemberId`,
        method: 'get'
    })
}

// 新增银行卡
export function saveBank(data) {
    return request({ 
        url: `${api}/bank/saveBank`,
        method: 'post',
        data
    })
}

// 提交提现申请
export function saveExpenses(data) {
    return request({ 
        url: `${api}/expenses/saveExpenses`,
        method: 'post',
        data
    })
}
