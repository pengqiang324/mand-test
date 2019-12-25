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
    path: '/about',
    name: 'ry-about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      index: 1,
      navIndex: 1,
      keepAlive: true,
      hasFooter: true,
      title: '关于'
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
    path: '/card',
    name: 'ry-card',
    component: () => import(/* webpackChunkName: "card" */ '../views/Card.vue'),
    meta: {
      index: 1,
      navIndex: 2,
      keepAlive: true,
      hasFooter: true,
      title: '信用卡'
    }
  },
  {
    path: '/child',
    name: 'ry-child',
    component: () => import(/* webpackChunkName: "child" */ '../views/Child.vue'),
    meta: {
      index: 2,
      hasFooter: false,
      keepAlive: false,
      title: '子页'
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
