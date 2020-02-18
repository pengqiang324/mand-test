import request from '@/libs/request'
const api = '/api'

// 会员卡订单查询
export function getOrders(params) {
    return request({ 
        url: `${api}/orders/orderList`,
        method: 'get',
        params
    })
}

// 申卡贷款订单查询
export function creditOrder(params) {
    return request({ 
        url: `${api}/get/creditOrder`,
        method: 'get',
        params
    })
}