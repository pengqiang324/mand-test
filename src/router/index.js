import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ry-home',
    component: Home,
    meta: {
      index: 1,
      navIndex: 0,
      keepAlive: true,
      hasFooter: true,
      title: '融溢'
    }
  },
  {
    path: '/credit',
    name: 'ry-credit',
    component: () => import(/* webpackChunkName: "about" */ '../views/credit'),
    meta: {
      index: 1,
      navIndex: 1,
      keepAlive: true,
      hasFooter: true,
      title: '信贷',
    }
  },
  {
    path: '/mine',
    name: 'ry-mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue'),
    meta: {
      index: 1,
      navIndex: 3,
      keepAlive: true,
      hasFooter: true,
      title: '我的'
    }
  },
  {
    path: '/personalTailor',
    name: 'ry-personalTailor',
    component: () => import(/* webpackChunkName: "personalTailor" */ '../views/personalTailor'),
    meta: {
      index: 1,
      navIndex: 2,
      keepAlive: true,
      hasFooter: true,
      title: '私人定制'
    }
  },
  {
    path: '/personalInfo',
    name: 'ry-personalInfo',
    component: () => import(/* webpackChunkName: "personalInfo" */ '../views/personalTailor/info.vue'),
    meta: {
      index: 2,
      title: '顾问详情'
    }
  },
  {
    path: '/evaluateInfo',
    name: 'ry-evaluateInfo',
    component: () => import(/* webpackChunkName: "evaluateInfo" */ '../views/evaluateInfo'),
    meta: {
      index: 3,
      title: '全部评价'
    }
  },
  {
    path: '/identity',
    name: 'ry-identity',
    component: () => import(/* webpackChunkName: "identity" */ '../views/identity'),
    meta: {
      index: 3,
      title: '身份',
      keepAlive: true
    }
  },
  {
    path: '/purchase',
    name: 'ry-purchase',
    component: () => import(/* webpackChunkName: "identity" */ '../views/payment'),
    meta: {
      index: 4,
      title: '购买支付'
    }
  },
  {
    path: '/paySuccess',
    name: 'ry-paySuccess',
    component: () => import(/* webpackChunkName: "paySuccess" */ '../views/payment/paySuccess.vue'),
    meta: {
      index: 5,
      title: '完成支付',
    }
  },
  {
    path: '/setting',
    name: 'ry-setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
    meta: {
      index: 2,
      hasFooter: false,
      title: '设置'
    }
  },
  {
    path: '/register',
    name: 'ry-register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/Register.vue'),
    meta: {
      index: 1,
      title: '融溢'
    }
  },
  {
    path: '/reagree',
    name: 'ry-reagree',
    component: () => import(/* webpackChunkName: "reagree" */ '../views/ReAgreement/ReAgree.vue'),
    meta: {
      index: 2,
      title: '店主注册协议'
    }
  },
  {
    path: '/reprotocol',
    name: 'ry-reprotocol',
    component: () => import(/* webpackChunkName: "reagree" */ '../views/ReAgreement/ReProtocol.vue'),
    meta: {
      index: 2,
      title: '用户隐私保护政策'
    }
  },
  {
    path: '/404',
    name: 'ry-unfound',
    component: () => import('../components/ResultPage/404.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/error',
    name: 'ry-error',
    component: () => import(/* webpackChunkName: "error" */ '../components/ResultPage/RyErrorInfo.vue'),
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
