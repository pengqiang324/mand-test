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
