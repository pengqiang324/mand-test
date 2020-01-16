import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import VueLazyload from 'vue-lazyload'
import VueWechatTitle from 'vue-wechat-title'
import VuePageStack from 'vue-page-stack'
import VueTouch from 'vue-touch'
import VueClipboard from 'vue-clipboard2'
import VueComponent from './libs/globalComponent'
import  fastClick from 'fastclick'
import { USER_LOGIN, USER_USERWXINFO, USER_REFRESHUSERINFO } from '@/actions/user'

// 全局样式
import './assets/styles/index.styl'
import "mand-mobile/components/_style/global.styl"
import "normalize.css"
import "vant/es/index.less"
import 'swiper/dist/css/swiper.css'

fastClick.attach(document.body)
Vue.use(VueLazyload, {})
Vue.use(VueWechatTitle)
Vue.use(VuePageStack, { router })
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueComponent)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

VueTouch.config.swipe = {
  threshold: 80 //手机左右滑动距离
}

// 全局路由拦截
router.beforeEach(async (to, from, next) => {
  const flag = localStorage.getItem('loginState') === 'isLogin'
  const PAGE_TITLE = to.meta.title ? to.meta.title : '融溢'
  document.title = PAGE_TITLE
 
  // 登录校验
  if (to.path === '/') {
    const token = localStorage.getItem('token')
    const NODE_ENV = process.env.NODE_ENV
    
    if (NODE_ENV === 'production') {
      if (!token) {
        return await hasCode(to, next)
       }
    } else {
      // 开发环境、测试环境
      const response = {
        data: {
          token: '84eea3a6-eeaa-482a-923c-1db9258b6a00',
          userId: 'b174db5ae2c941099acd95907105e57e',
          wxOpen: 'oPlVK1Ad3HPa07JojQY6H4fIQ7PQ',
          top: 0,
          tel: 15211023567,
          isCert: 1,
        },
      }
      store.commit('user/SAVEUSERINFO', response)
      store.commit('user/ISLOGIN', true)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      localStorage.setItem('loginState', 'isLogin');
    }
    
    return next()
  }
  
  if (to.path === '/reagree' || to.path === '/reprotocol') return next()
  if (to.path === '/error') return next()
  
  if (!flag && to.path !== '/register') {
    return next('/register') //初次登录注册重定向注册登录页面
  }

  next()
})

async function hasCode(to, next) {
  const { delCode } = to.query

  // 清除缓存后强制code清除
  if (delCode) {
    let url = window.location.href // 判断是否存在参数
    url = url.replace(/(\?|#)[^'"]*/, '') // 去除参数
    window.history.pushState({}, 0, url)
  } else {
    store.dispatch('hideAppLoading', true)
  }

  const search = qs.parse(location.search.split('?')[1])
  const URL = encodeURIComponent(location.href.split('#')[0])

  if (!search.code) {
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8038b7b97fcda832&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
  } else {
    const response = await store.dispatch(USER_USERWXINFO({
      code: search.code
    }))

    if (response.data && response.data.success) {
      store.dispatch('showErrorLogin', false)
      const { data } = response.data
      const res = await store.dispatch(USER_LOGIN({
        username: data.openId
      }))

      store.dispatch('hideAppLoading', false) // 隐藏全局loading组件

      if (res.data) {
        localStorage.setItem('loginState', 'isLogin')
        await store.dispatch(USER_REFRESHUSERINFO())  //更新最新用户信息
        return next('/') 
      }else {
        return next('/register')
      }
    } else {
      store.dispatch('showErrorLogin', true)  // 显示错误反馈
    }
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
