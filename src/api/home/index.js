import request from '@/libs/request'
const api = '/api'

// 获取银行列表
export function getBankList(data) {
    return request({ 
        url: `${api}/xinshijie/bankstatus`,
        method: 'post',
        data
    })
}

// 获取融溢头条
export function getNewNews() {
    return request({
        url: `${api}/sysNotice/getHomePage`,
        method: 'get'
    })
}