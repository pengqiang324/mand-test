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

// 导航列表文章列表
export function getArticalList(params) {
    return request({
        url: `${api}/sysArticle/getBySysNivbarId`,
        method: 'get',
        params
    })
}

// 文章详情
export function getArticalInfo(params) {
    return request({
        url: `${api}/sysArticle/getInfoById`,
        method: 'get',
        params
    })
}

// 文章列表轮播图
export function getBannerImg(params) {
    return request({
        url: `${api}/sysCarousel/getByTypeOrColumnId`,
        method: 'get',
        params
    })
}
