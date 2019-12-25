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
import mixins from '@/libs/mixins'

export default {
  name: "ry-home",

  mixins: [mixins],

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
     this.showDiaLog() // 是否显示完善信息弹窗
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
