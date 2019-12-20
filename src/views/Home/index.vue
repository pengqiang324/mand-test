<template>
  <div class="home" v-cloak>
    <template v-if="showNetwork">
      <ry-result-network/>
    </template>
    <template v-if="!showNetwork">
      <ry-scroll-view
      :showRefresh="true"
      @onRefresh="$_onRefresh"
    >
      <div id="nav">
        <router-link to="/child">子页</router-link> |
        <router-link to="/setting">设置</router-link>
      </div>
      <div class="md-example-child-swiper-0">
        <md-swiper
        ref="swiper"
        :is-prevent="false"
        :useNative-driver="false"
      >
        <md-swiper-item :key="$index" v-for="(item, $index) in simple">
          <div
            class="banner-item"
            :style="{'background': `${item.color}`}">{{item.text}}</div>
          </md-swiper-item>
        </md-swiper>
        </div>
        <div class="bottom">
          123
        </div>
        <van-button type="primary">主要按钮</van-button>
        <van-button plain type="primary">朴素按钮</van-button>
        <van-button plain hairline type="primary">细边框按钮</van-button>
        <p>图标展示123</p>
        <md-icon name="success-color" size="lg" svg></md-icon>
      </ry-scroll-view>
    </template>
  </div>
</template>

<script>
import {
  Icon,
  Swiper, 
  ActionBar, 
  SwiperItem, 
} from 'mand-mobile'

import { 
  Button,
  Notify
} from 'vant'

import simple from 'mand-mobile/components/swiper/demo/data/simple'
import { mapState } from 'vuex'
import qs from 'qs'
// import { login } from '@/api/user/user'
import { USER_LOGIN, USER_USERWXINFO, USER_REFRESHUSERINFO } from '@/actions/user'

export default {
  name: "ry-home",

  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [ActionBar.name]: ActionBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },

  data() {
    return {
      simple,
      active: 0,
      quantity: 25,
      isFinished: false,
      visible: false,
      timer: null
    }
  },

  computed: {
    ...mapState([
      'showNetwork',
    ])
  },

  created() {
    this.login() // 登录注册
  },

  mounted() {
    // this.$refs.scrollView.triggerRefresh()  //初始化下拉刷新数据
  },


  beforeRouteLeave(to, from, next) {
    this.$notify.clear() //清除消息通知
    next()
  },

  deactivated() {
    this.$toast.clear()  // 清除切换页面后的其余toast轻提示
  },

  methods: {
    $_onRefresh({finishRefresh}) {

      let timer = setTimeout(() => {
        Notify({ background: 'rgba(255,131,36,0.8)', message: '刷新成功' })
        finishRefresh()
      }, 2000)

      // 清除定时器
      this.$once('hook:deactivated', () => {
        clearTimeout(timer)
        finishRefresh()
        timer = null
      })
    },

    async login() {
      const token = localStorage.getItem('token');

      if (!token) {
        return await this.hasCode()
      }
    },

    async hasCode() {
      const search = qs.parse(location.search.split('?')[1])
      const URL = encodeURIComponent(location.href.split('#')[0])
  
      if (!search.code) {
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0a71240195bf0c4d&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
      } else {
        const response = await this.$store.dispatch(USER_USERWXINFO({
          code: search.code
        }))

        if (response.data && response.data.success) {
          const { data } = response.data;
          const res = await this.$store.dispatch(USER_LOGIN({
            username: data.openId
          }))
          
          if (res.data) {
            localStorage.setItem('loginState', 'isLogin')
            await this.$store.dispatch(USER_REFRESHUSERINFO());  //更新最新用户信息
            this.$router.push('/home') 
          }else {
            this.$router.push('/register')
          }
        } 
      }
    }
  },
};
</script>

<style lang="stylus">
.home {
  setPadding()
  width: 100%;
  font-size: 28px;
  height: 100%;
  background: #fff;
  .md-example-child-swiper-0 {
    height: 250px;
    .banner-item {
      float: left;
      width: 100%;
      height: 100%;
      line-height: 250px;
      text-align: center;
      font-size: 28px;
      color: #FFF;
      box-align: center;
      align-items: center;
      box-pack: center;
      justify-content: center;
      text-decoration-line: none;
    }
  }
  .bottom {
    width: 750px;
    margin-bottom: 20px;
    background: #f00;
    line-height: 50px;
    font-size: 28px;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    font-size: 32px;
    line-height: 1.2;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #fc9153;
  }
}

[v-cloak] {
  display none
}

</style>
