import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs/rem'

// 全局样式
import './assets/styles/index.less'

import "mand-mobile/components/_style/global.styl"
import "normalize.css"

import "vant/es/index.less"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
