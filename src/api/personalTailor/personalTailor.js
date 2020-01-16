import request from '@/libs/request'
const api = '/api'

// 获取私人定制数据
export function getHomeAdviserByServiceType(params) {
    return request({ 
        url: `${api}/adviser/getHomeAdviserByServiceType`,
        method: 'get',
        params
    })
}

// 私人定制顾问详情
export function getAdviserInfoById(params) {
    return request({ 
        url: `${api}/adviser/getAdviserInfoById`,
        method: 'get',
        params
    })
}

// 私人定制详情页评价总数
export function getAdviserCountComment(params) {
    return request({ 
        url: `${api}/adviser/getAdviserCountComment`,
        method: 'get',
        params
    })
}

// 私人定制详情评价最新6条
export function getAdviserNewComment(params) {
    return request({ 
        url: `${api}/adviser/getAdviserNewComment`,
        method: 'get',
        params
    })
}

// 私人定制评价列表
export function getAdviserCommentByMemberId(params) {
    return request({ 
        url: `${api}/adviser/getAdviserCommentByMemberId`,
        method: 'get',
        params
    })
}

// 私人定制中用户是否填写征信
export function judgeByCustomerId() {
    return request({ 
        url: `${api}/adviserCustomerInfo/judgeByCustomerId`,
        method: 'get'
    })
}

// 私人定制用户征信信息填写
export function addAdviserCustomerInfo(data) {
    return request({ 
        url: `${api}/adviserCustomerInfo/addAdviserCustomerInfo`,
        method: 'post',
        data
    })
}
