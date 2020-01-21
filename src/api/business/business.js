import request from '@/libs/request'
import qs from 'qs'
const api = '/api'

// 商学院专题分类、公司简介获取
export function getAll(params) {
    return request({ 
        url: `${api}/sysCarousel/getAll`,
        method: 'get',
        params
    })
}

// 商学院点击亮，观看数
export function addView(params) {
    return request({ 
        url: `${api}/sysCarousel/addView?${qs.stringify(params)}`,
        method: 'put'
    })
}

// 查询视频列表
export function getAllByTypeId(params) {
    return request({ 
        url: `${api}/sysVideo/getAllByTypeId`,
        method: 'get',
        params
    })
}


// 获取视频播放凭证
export function getPlayauth(params) {
    return request({ 
        url: `${api}/ali/getVideoPlayAuth`,
        method: 'get',
        params
    })
}

// 列表观看次数
export function addListView(params) {
    return request({ 
        url: `${api}/sysVideo/addView?${qs.stringify(params)}`,
        method: 'put'
    })
}

// 根据视频id获取视频信息
export function getVideoId(params) {
    return request({ 
        url: `${api}/sysVideo/getVideoById`,
        method: 'get',
        params
    })
}

// 导航列表模块获取
export function getListAll() {
    return request({
        url: `${api}/sysNivbar/getAll`,
        method: 'get'
    })
}
