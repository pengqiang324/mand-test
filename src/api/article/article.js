import request from '@/libs/request'
const api = '/api'

// 文章列表分类获取
export function getByType(params) {
    return request({ 
        url: `${api}/sysArticle/getByType`,
        method: 'get',
        params
    })
}