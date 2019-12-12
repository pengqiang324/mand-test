<template>
  <div class="mine-box">
      <v-touch v-on:swipeleft="swiperLeft" v-on:swiperight="swiperRight"  class="wrapper">
        我的页面, 内容内容内容2222
      </v-touch>
  </div>
</template>

<script>
export default {
    name: 'ry-mine',

    created(){
      console.log('mine触发了')
    },

    methods: {
      swiperLeft() {
        console.log('向左滑动了')
      },

      swiperRight() {
        console.log('向右滑动了')
      }
    }
}
</script>

<style lang="stylus">
  .mine-box {
    height: 100%;
    font-size: 28px;
  }
</style>