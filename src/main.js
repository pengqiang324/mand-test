import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePageStack from 'vue-page-stack'
import VueTouch from 'vue-touch'
import VueComponent from './libs/globalComponent'

// 全局样式
import './assets/styles/index.styl'
import "mand-mobile/components/_style/global.styl"
import "normalize.css"
import "vant/es/index.less"

Vue.use(VuePageStack, { router })
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueComponent)
Vue.config.productionTip = false
VueTouch.config.swipe = {
  threshold: 80 //手机左右滑动距离
}

// 全局路由拦截
router.beforeEach((to, from, next) => {
  const PAGE_TITLE = to.meta.title ? to.meta.title : '融溢'
  document.title = PAGE_TITLE

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
