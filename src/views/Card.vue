<template>
  <div class="wrapper">
      <h1>信用卡页面</h1>
        <ry-result-empty class="result-empty"/>
  </div>
</template>

<script>
export default {
  name: 'ry-card',

  created(){
  },

  methods: {
  }
}
</script>

<style lang="stylus">
.wrapper {
  setPadding()
  background #fff
  h1 {
    height 100px
    line-height 100px
    text-align center
    font-size 32px
    background #fff
  }
  .scroll-view {
    setPadding()
    .scroll-view-container {
      height 100%
    }
    .result-empty {
      height 100%
    }
  }
}
</style>