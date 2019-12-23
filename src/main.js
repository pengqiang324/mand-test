import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'
import VueWechatTitle from 'vue-wechat-title'
import VuePageStack from 'vue-page-stack'
import VueTouch from 'vue-touch'
import VueComponent from './libs/globalComponent'
import { USER_LOGIN, USER_USERWXINFO, USER_REFRESHUSERINFO } from '@/actions/user'

// 全局样式
import './assets/styles/index.styl'
import "mand-mobile/components/_style/global.styl"
import "normalize.css"
import "vant/es/index.less"

Vue.use(VueWechatTitle)
Vue.use(VuePageStack, { router })
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueComponent)
Vue.config.productionTip = false
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
    const token = localStorage.getItem('token');

    if (!token) {
     return await isLogin(next)
    }
    return next()
  }
  
  if (to.path === '/reagree' || to.path === '/reprotocol') return next()

  if (!flag && to.path !== '/register') {
    return next('/register') //初次登录注册重定向注册登录页面
  }

  next()
})

async function isLogin(next) {
  const search = qs.parse(location.search.split('?')[1])
  const URL = encodeURIComponent(location.href.split('#')[0])

  if (!search.code) {
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8038b7b97fcda832&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
  } else {
    const response = await store.dispatch(USER_USERWXINFO({
      code: search.code
    }))

    if (response.data && response.data.success) {
      const { data } = response.data;
      const res = await store.dispatch(USER_LOGIN({
        username: data.openId
      }))
      
      if (res.data) {
        localStorage.setItem('loginState', 'isLogin')
        await store.dispatch(USER_REFRESHUSERINFO());  //更新最新用户信息
        return next('/') 
      }else {
        return next('/register')
      }
    } 
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
