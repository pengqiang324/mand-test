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
  // {
  //   path: '/credit',
  //   name: 'ry-credit',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/credit'),
  //   meta: {
  //     index: 1,
  //     navIndex: 1,
  //     keepAlive: true,
  //     hasFooter: true,
  //     title: '信贷',
  //   }
  // },
  {
    path: '/mine',
    name: 'ry-mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue'),
    meta: {
      index: 1,
      navIndex: 2,
      keepAlive: true,
      hasFooter: true,
      title: '我的'
    }
  },
  {
    path: '/personalTailor',
    name: 'ry-personal-tailor',
    component: () => import(/* webpackChunkName: "personalTailor" */ '../views/personalTailor'),
    meta: {
      index: 1,
      navIndex: 1,
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
      keepAlive: true,
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
      title: '身份'
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
    path: '/business',
    name: 'ry-business',
    component: () => import(/* webpackChunkName: "business" */ '../views/business'),
    meta: {
      index: 2,
      keepAlive: true,
      hasFooter: false,
      title: '商学院'
    }
  },
  {
    path: '/businessInfo',
    name: 'ry-businessInfo',
    component: () => import(/* webpackChunkName: "business" */ '../views/business/businessInfo.vue'),
    meta: {
      index: 3,
      keepAlive: true,
      hasFooter: false,
      title: '公司介绍'
    }
  },
  {
    path: '/courseList',
    name: 'ry-courseList',
    component: () => import(/* webpackChunkName: "courseList" */ '../views/courseList'),
    meta: {
      index: 3,
      keepAlive: true,
      hasFooter: false,
      title: '课程'
    }
  },
  {
    path: '/courseInfo',
    name: 'ry-courseInfo',
    component: () => import(/* webpackChunkName: "courseInfo" */ '../views/courseList/courseInfo.vue'),
    meta: {
      index: 4,
      hasFooter: false,
      title: '课程详情'
    }
  },
  {
    path: '/guide',
    name: 'ry-guide',
    component: () => import(/* webpackChunkName: "guide" */ '../views/guide'),
    meta: {
      index: 3,
      keepAlive: true,
      hasFooter: false,
      title: '融溢指南'
    }
  },
  {
    path: '/Cognos/:id?',
    name: 'ry-Cognos',
    component: () => import(/* webpackChunkName: "Cognos" */ '../views/Cognos'),
    meta: {
      index: 3,
      hasFooter: false,
      title: '新手入门'
    }
  },
  {
    path: '/courseArticle',
    name: 'ry-courseArticle',
    component: () => import(/* webpackChunkName: "courseArticle" */ '../views/courseArticle'),
    meta: {
      index: 4,
      hasFooter: false,
      title: '课程文章'
    }
  },
  {
    path: '/learnCourse',
    name: 'ry-learnCourse',
    component: () => import(/* webpackChunkName: "learnCourse" */ '../views/learnCourse'),
    meta: {
      index: 2,
      keepAlive: true,
      hasFooter: false,
      title: '学习课程'
    }
  },
  {
    path: '/perfectApply',
    name: 'ry-perfectApply',
    component: () => import(/* webpackChunkName: "perfectApply" */ '../views/perfectApply'),
    meta: {
      index: 3,
      keepAlive: true,
      hasFooter: false,
      title: '完善申请人信息'
    }
  },
  {
    path: '/shopOwner',
    name: 'ry-shopOwner',
    component: () => import(/* webpackChunkName: "shopOwner" */ '../views/shopOwner'),
    meta: {
      index: 4,
      hasFooter: false,
      title: '购买支付'
    }
  },
  {
    path: '/openSuccess',
    name: 'ry-openSuccess',
    component: () => import(/* webpackChunkName: "openSuccess" */ '../views/shopOwner/openSuccess.vue'),
    meta: {
      index: 5,
      hasFooter: false,
      title: '完成开通'
    }
  },
  {
    path: '/setting',
    name: 'ry-setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
    meta: {
      index: 3,
      keepAlive: true,
      hasFooter: false,
      title: '设置'
    }
  },
  {
    path: '/adviseApply',
    name: 'ry-adviseApply',
    component: () => import(/* webpackChunkName: "adviseApply" */ '../views/adviseApply'),
    meta: {
      index: 4,
      hasFooter: false,
      title: '顾问申请信息'
    }
  },
  {
    path: '/customer',
    name: 'ry-customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/advise/customer'),
    meta: {
      index: 1,
      hasFooter: true,
      keepAlive: true,
      title: '客户'
    }
  },
  {
    path: '/applyCard',
    name: 'ry-applyCard',
    component: () => import(/* webpackChunkName: "applyCard" */ '../views/applyCard'),
    meta: {
      index: 2,
      title: '申请信用卡'
    }
  },
  {
    path: '/myOrder',
    name: 'ry-myOrder',
    component: () => import(/* webpackChunkName: "MyOrder" */ '../views/MyOrder'),
    meta: {
      index: 3,
      keepAlive: true,
      title: '会员卡订单'
    }
  },
  {
    path: '/cashWithdrawal',
    name: 'ry-cashWithdrawal',
    component: () => import(/* webpackChunkName: "cashWithdrawal" */ '../views/cashWithdrawal'),
    meta: {
      index: 3,
      keepAlive: true,
      title: '银行卡'
    }
  },
  {
    path: '/waitResult',
    name: 'ry-waitResult',
    component: () => import(/* webpackChunkName: "waitResult" */ '../views/cashWithdrawal/waitResult'),
    meta: {
      index: 6,
    
      title: '提现进度'
    }
  },
  {
    path: '/addBank',
    name: 'ry-addBank',
    component: () => import(/* webpackChunkName: "addBank" */ '../views/cashWithdrawal/addBank'),
    meta: {
      index: 5,
      title: '添加银行卡'
    }
  },
  {
    path: '/cashOut',
    name: 'ry-cashOut',
    component: () => import(/* webpackChunkName: "addBank" */ '../views/cashWithdrawal/cashOut'),
    meta: {
      index: 4,
      title: '提现'
    }
  },
  {
    path: '/expect',
    name: 'ry-expect',
    component: () => import(/* webpackChunkName: "expect" */ '../views/expect'),
    meta: {
      index: 1,
      title: '敬请期待'
    }
  },
  {
    path: '/register',
    name: 'ry-register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/Register.vue'),
    meta: {
      index: 1,
      keepAlive: true,
      title: '融溢'
    }
  },
  {
    path: '/reagree',
    name: 'ry-reagree',
    component: () => import(/* webpackChunkName: "reagree" */ '../views/ReAgreement/ReAgree.vue'),
    meta: {
      index: 2,
      keepAlive: true,
      title: '店主注册协议'
    }
  },
  {
    path: '/reprotocol',
    name: 'ry-reprotocol',
    component: () => import(/* webpackChunkName: "reagree" */ '../views/ReAgreement/ReProtocol.vue'),
    meta: {
      index: 2,
      keepAlive: true,
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
