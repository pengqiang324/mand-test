import store from '../store'
import axios from 'axios'
import { Toast } from 'vant'
import { IsIOS } from './lib'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://test-app.tunyukeji.com' : 'http://test-app.tunyukeji.com',
    timeout: 5000
})

service.interceptors.request.use((config) => {
    store.commit('updateLoading', true)
    return config
}, (err) => {
    return Promise.resolve(err)
})

service.interceptors.response.use((response) => {
    const { success, message } = response.data
    
    // 是否显示加载图标
    store.commit('updateLoading', false)

    // 网络请求出错反馈
    store.commit('updateNetwork', false)

    switch(success) {  
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
            return response
        default:
            Toast({
                message: message,  // 后端抛出的错误
                position: 'bottom',
            })
            return Promise.resolve(response)
    }
}, (err) => {
    if (err && err.response) {
        switch (err.response.status) {  // 由网络或者服务器抛出的错误
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)';break;
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

    store.commit('updateLoading', false)
    
    if (err.response.status !== 401) {
        store.commit('updateNetwork', true)
    }

    store.commit('updateErrorInfo', { 
        showErrorInfo: true,
        errorMessage: err.message
    })

    // 统一返回resolve 错误反馈
    const errData = {
        code: -404,
        message: err.message,
        data: '',
    }
    return Promise.resolve(errData)
})

export default service