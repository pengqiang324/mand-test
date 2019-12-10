import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePageStack from 'vue-page-stack'
import VueTouch from 'vue-touch'

// 全局样式
import './assets/styles/index.styl'
import "mand-mobile/components/_style/global.styl"
import "normalize.css"
import "vant/es/index.less"

Vue.use(VuePageStack, { router })
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false

VueTouch.config.swipe = {
  threshold: 80 //手机左右滑动距离
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
