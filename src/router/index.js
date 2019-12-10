import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ry-home',
    component: Home,
    meta: {
      index: 1,
      hasFooter: true,
      navIndex: 0
    }
  },
  {
    path: '/about',
    name: 'ry-about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      index: 1,
      hasFooter: true,
      navIndex: 1
    }
  },
  {
    path: '/mine',
    name: 'ry-mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue'),
    meta: {
      index: 1,
      hasFooter: true,
      navIndex: 3
    }
  },
  {
    path: '/card',
    name: 'ry-card',
    component: () => import(/* webpackChunkName: "card" */ '../views/Card.vue'),
    meta: {
      index: 1,
      hasFooter: true,
      navIndex: 2
    }
  },
  {
    path: '/child',
    name: 'ry-child',
    component: () => import(/* webpackChunkName: "child" */ '../views/Child.vue'),
    meta: {
      index: 2,
      hasFooter: false
    }
  },
  {
    path: '/setting',
    name: 'ry-setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
    meta: {
      index: 2,
      hasFooter: false,
    }
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
