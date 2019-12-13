import store from '../store'
import axios from 'axios'
import { Toast } from 'vant'
import { IsIOS } from './lib'

const service = axios.create({
    baseURL: process.env.RY_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use((config) => {
    store.commit('updateResult', true)
    return config
}, (err) => {
    return Promise.reject(err)
})

service.interceptors.response.use((response) => {
    const data = response.data

    store.commit('updateResult', false)
    switch(data.success) {  
        case true:
            // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
            if (IsIOS()) {
                // 异步以保证数据已渲染到页面上
                setTimeout(() => {
                    // 通过滚动强制浏览器进行页面重绘
                    document.body.scrollTop += 1
                }, 0)
            }
            // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
            return data
        default:
            Toast({
                message: data.message,  // 后端抛出的错误
                position: 'bottom',
            })
            return Promise.reject(data)
    }
}, (err) => {
    if (err && err.response) {
        switch (err.response.status) {  // 由网络或者服务器抛出的错误
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break; // 重新登陆 token失效
            case 403: err.message = '拒绝访问(403)'; break; //重新登陆 token失效
            case 404: err.message = '请求出错(404)'; break;  // 接口404
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }

    store.commit('updateNetwork', true)
    store.commit('updateResult', false)

    Toast({
        message: err.message,
        position: 'bottom',
    })
    return Promise.reject(err)
})

export default service