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
  </div>
</template>

<script>
import {ActionBar, Toast, Swiper, SwiperItem} from 'mand-mobile'
import simple from 'mand-mobile/components/swiper/demo/data/simple'
export default {
  name: "home",

  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [ActionBar.name]: ActionBar,
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
<style lang="less">
.home {
  font-size: 16Px;
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
}
</style>
