import request from '@/libs/request'
const api = '/api'

// 完善申请人信息
export function getEchOwnerInfo() {
    return request({ 
        url: `${api}/users/getEchOwnerInfo`,
        method: 'get'
    })
}

// 申请人信息修改
export function updateInfo(data) {
    return request({ 
        url: `${api}/member/updateMember`,
        method: 'put',
        data
    })
}

// 会员卡订单下单
export function addOrder(data) {
    return request({ 
        url: `${api}/orders/member/addOrder`,
        method: 'post',
        data
    })
}

// 获取推荐人信息
export function getRecommenderInfo() {
    return request({ 
        url: `${api}/users/getRecommenderInfo`,
        method: 'get',
    })
}

// 微信预下单
export function byOrderId(data) {
    return request({ 
        url: `${api}/orders/pre/byOrderId`,
        method: 'post',
        data
    })
}

// 获取用户信息
export function getInfo() {
    return request({ 
        url: `${api}/users/getInfo`,
        method: 'get'
    })
}