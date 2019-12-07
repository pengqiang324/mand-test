<template>
  <div class="home">
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
    <md-action-bar :actions="data"/>
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
import simple from 'mand-mobile/components/swiper/demo/data/simple'
import { Button } from 'vant'

export default {
  name: "home",

  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [ActionBar.name]: ActionBar,
    [Icon.name]: Icon,
    [Button.name]: Button
  },

  data() {
    return {
       data: [
        {
          text: '主要按钮',
          onClick: this.handleClick,
        },
      ],
      simple,
    }
  },

  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },

  created() {
    console.log(simple)
  }
};
</script>
<style lang="stylus">
.home {
  font-size: 28px;
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
}
</style>
