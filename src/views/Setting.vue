<template>
  <div class="setting-box">
    <v-touch v-on:swipeleft="swiperLeft" v-on:swiperight="swiperRight"  :swipe-options="{direction: 'horizontal'}" class="wrapper">
        设置页面, 内容内容内容33333
    </v-touch>
  </div>
</template>

<script>
export default {
  name: 'ry-setting',

  methods: {
    swiperLeft() {
      this.$router.forward()
    },

    swiperRight() {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus">
  .setting-box {
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: 28px;
  }
</style>