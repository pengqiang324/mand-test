<template>
  <div class="home">
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
    <p>图标展示</p>
    <md-icon name="success-color" size="lg" svg></md-icon>
    
  </div>
</template>

<script>
import {ActionBar, Toast, Swiper, SwiperItem, Icon} from 'mand-mobile'
import { Button } from 'vant'
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
      active: 0
    }
  },

  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },

  created() {
  }
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
