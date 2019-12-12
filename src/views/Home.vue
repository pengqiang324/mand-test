<template>
  <div class="home">
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
      <van-button type="primary" @click="$_showToast">主要按钮</van-button>
      <van-button plain type="primary">朴素按钮</van-button>
      <van-button plain hairline type="primary">细边框按钮</van-button>
      <p>图标展示</p>
      <md-icon name="success-color" size="lg" svg></md-icon>
    </ry-scroll-view>
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
      isFinished: false
    }
  },

  created() {
  },

  mounted() {
    // this.$refs.scrollView.triggerRefresh()  //初始化下拉刷新数据
  },

  beforeRouteLeave(to, from, next) {
    this.$notify.clear() //清除消息通知
    next()
  },

  methods: {
    $_onRefresh({finishRefresh}) {
      // async data
      setTimeout(() => {
        console.log('数据加载完成')
        finishRefresh()
        Notify({ background: 'rgba(255,131,36,0.8)', message: '刷新成功' })
      }, 2000)
    },

    $_showToast() {
      this.$toast({
        message: '请求超时',
        position: 'bottom',
        transition: 'fadeIn',
        forbidClick: true,
      })
    }
  },
};
</script>

<style lang="stylus">
.home {
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

</style>
